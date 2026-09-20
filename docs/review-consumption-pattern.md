# Review Consumption Pattern — Analysis & Proposal

> Source: `src/components/section/ReviewList.astro`
> Purpose: document the current fetch pattern, identify inefficiencies, and propose
> an optimized approach for the Apps Script endpoint.

---

## Current Implementation

### Data Flow

```
Client (Browser)
  → fetch("https://script.google.com/macros/s/{DEPLOY_ID}/exec")
  → Apps Script doGet() reads ALL rows from Google Sheet
  → Returns JSON: { reviews: [...] }
  → Client filters by `Tour Title === currentTourTitle`
  → Renders matching reviews as HTML cards
```

### What Happens Today

1. **Every page load** triggers a fetch to the Apps Script web app.
2. **No query parameters** are sent — the endpoint returns the entire sheet.
3. **All filtering happens client-side** — the `.filter()` on line 58–62 of `ReviewList.astro`.
4. **No caching** — the same full dataset is fetched on every navigation (ViewTransitions re-trigger `loadReviews`).
5. **No pagination** — all matching reviews render at once.

### The Endpoint (Apps Script side, not in this repo)

```js
// Presumed doGet — returns everything
function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Reviews');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const reviews = rows
    .filter(row => row.some(cell => cell !== ''))
    .map(row => Object.fromEntries(headers.map((k, i) => [k, row[i]])));

  return ContentService
    .createTextOutput(JSON.stringify({ reviews }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Problems

### 1. Over-fetching (O(n) for O(k) need)

If the sheet has 500 reviews across 20 tours, but the page only needs reviews for
one tour, the client downloads all 500 to use ~25. On mobile connections this is
noticeable.

### 2. No Cache at Either Layer

- **Apps Script side**: no `CacheService` usage — every `doGet` call reads the sheet.
- **Client side**: no `localStorage` / `sessionStorage` / HTTP cache headers — every
  navigation re-fetches.

### 3. Client-Side Filter is Fragile

The filter compares `review["Tour Title"].trim() === currentTourTitle`. If the
sheet has trailing spaces, different casing, or the tour title changes slightly
between form submission and page load, reviews silently disappear.

### 4. No Pagination or Lazy Loading

If a tour accumulates 100+ reviews, the DOM gets heavy. There's no "load more"
or virtual scrolling.

---

## Proposed Optimized Architecture

### Layer 1: Apps Script — Server-Side Filtering + Cache

```js
function doGet(e) {
  const tourTitle = (e.parameter.tour || '').trim();
  const page = parseInt(e.parameter.page || '1', 10);
  const pageSize = parseInt(e.parameter.size || '20', 10);

  const cache = CacheService.getScriptCache();
  const cacheKey = `reviews_${tourTitle}_${page}_${pageSize}`;

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return ContentService
      .createTextOutput(cached)
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Read sheet
  const sheet = SpreadsheetApp.openById(getSheetId()).getSheetByName('Reviews');
  const [headers, ...rows] = sheet.getDataRange().getValues();

  let reviews = rows
    .filter(row => row.some(cell => cell !== ''))
    .map(row => Object.fromEntries(headers.map((k, i) => [k, row[i]])));

  // Server-side filter
  if (tourTitle) {
    reviews = reviews.filter(r =>
      r['Tour Title'] && r['Tour Title'].trim().toLowerCase() === tourTitle.toLowerCase()
    );
  }

  // Sort by timestamp descending (newest first)
  reviews.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));

  const total = reviews.length;
  const start = (page - 1) * pageSize;
  const paged = reviews.slice(start, start + pageSize);

  const result = JSON.stringify({
    reviews: paged,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasMore: start + pageSize < total,
    },
  });

  // Cache for 5 minutes
  cache.put(cacheKey, result, 300);

  return ContentService
    .createTextOutput(result)
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Layer 2: Client — Fetch with Query Params + Local Cache

```js
async function loadReviews() {
  const container = document.getElementById('dynamic-reviews-container');
  const loading = document.getElementById('review-loading');
  const tituloEl = document.querySelector('#titulo');

  const API_URL = 'https://script.google.com/macros/s/{DEPLOY_ID}/exec';

  if (!tituloEl || !tituloEl.dataset.titulo) {
    if (loading) loading.style.display = 'none';
    return;
  }

  const currentTourTitle = tituloEl.dataset.titulo.trim();

  // Local cache key per tour
  const cacheKey = `reviews_${currentTourTitle}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    const data = JSON.parse(cached);
    renderReviews(data.reviews, container, loading);
    return;
  }

  try {
    // Pass tour as query param — server filters before responding
    const url = new URL(API_URL);
    url.searchParams.set('tour', currentTourTitle);
    url.searchParams.set('page', '1');
    url.searchParams.set('size', '50');

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch reviews');

    const data = await response.json();

    // Cache in sessionStorage (survives same-session navigations)
    sessionStorage.setItem(cacheKey, JSON.stringify(data));

    renderReviews(data.reviews, container, loading);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    if (loading) loading.style.display = 'none';
    container.innerHTML = `
      <div class="col-span-full py-10 text-center">
        <p class="text-red-500">Sorry, we couldn't load the reviews at this moment.</p>
      </div>
    `;
  }
}

function renderReviews(reviews, container, loading) {
  if (loading) loading.style.display = 'none';

  if (!reviews || reviews.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-10 text-center">
        <p class="text-gray-500 italic">No reviews yet for this tour. Be the first to share your experience!</p>
      </div>
    `;
    return;
  }

  // ... existing card rendering logic (escapeHTML, generateStars, etc.)
  // Keep the same HTML structure, just receive pre-filtered data.
}
```

### Layer 3 (Optional): Cache Invalidation

```js
// Apps Script — call after new form submission via trigger
function invalidateReviewCache(tourTitle) {
  const cache = CacheService.getScriptCache();
  // Clear all page variants for this tour
  for (let page = 1; page <= 10; page++) {
    for (const size of [10, 20, 50]) {
      cache.remove(`reviews_${tourTitle}_${page}_${size}`);
    }
  }
}

// Trigger: fire on form submit
function onFormSubmit(e) {
  const responses = e.response.getItemResponses();
  const tourTitle = responses.find(r => r.getItem().getTitle() === 'Tour Title')
    ?.getResponse() || 'all';
  invalidateReviewCache(tourTitle);
}
```

---

## Summary of Changes

| Aspect | Current | Proposed |
|--------|---------|----------|
| Filtering | Client-side `.filter()` | Server-side `?tour=` param |
| Data transferred | All reviews (all tours) | Only matching reviews |
| Caching | None | `CacheService` (5min) + `sessionStorage` |
| Pagination | None | `?page=1&size=50` with metadata |
| Cache invalidation | None | Trigger on form submit |
| Case sensitivity | Exact match (fragile) | Case-insensitive `.toLowerCase()` |
| Sort order | Sheet order (insertion) | Newest first (by timestamp) |

---

## Migration Checklist

- [ ] Update `doGet` in Apps Script to accept `tour`, `page`, `size` query params
- [ ] Add `CacheService` caching in `doGet`
- [ ] Add form submit trigger to invalidate cache
- [ ] Update `ReviewList.astro` to pass `?tour=` in the fetch URL
- [ ] Add `sessionStorage` caching on client
- [ ] Add "Load More" button for pagination (if > 20 reviews per tour)
- [ ] Test: form submit → cache invalidation → fresh fetch shows new review
- [ ] Test: same-session navigation uses sessionStorage (no server hit)
