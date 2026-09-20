# Google Form — Reviews Spec

> Source: `src/components/section/Recomendaciones.astro` front matter.
> Purpose: recreate this form programmatically via Apps Script `FormApp` in another project.

---

## Form Metadata

| Property       | Value                                                                 |
| -------------- | --------------------------------------------------------------------- |
| Title          | Share Your Journey                                                    |
| Description    | Help us maintain our standards and inspire others. Every review is sent directly to our management team for review. |
| Action URL     | `https://docs.google.com/forms/d/e/1FAIpQLScW1VahsHSCWY2sAjGlow8KgSzObVMJq5OkGAfT32ekPVerCw/formResponse` |
| Method         | POST (no-cors from client)                                            |
| Linked Sheet   | `https://docs.google.com/spreadsheets/d/1PJM7WVoWshFgI6j5sA7SSRPc03s2s5zOIYB20PMFOTc/edit` |

---

## Fields

### Text / Contact Fields

| Label              | Entry ID              | Type        | Required | Notes                          |
| ------------------ | --------------------- | ----------- | -------- | ------------------------------ |
| Full Name          | `entry.1770894358`    | TEXT        | No       |                                |
| Email Address      | `entry.228567320`     | TEXT        | No       | Plain text, no server validation |
| Message / Feedback | `entry.1360316101`    | PARAGRAPH   | No       | "Tell us about the highlights of your trip..." |
| Tour Title         | `entry.1704160591`    | TEXT        | No       | Injected dynamically from `#titulo` element on the page |

### Rating Fields (Scale 1–5 stars)

| Label       | Entry ID               | Type  | Required |
| ----------- | ---------------------- | ----- | -------- |
| Rating      | `entry.956031060`      | SCALE | No       |
| Comfort     | `entry.1766596268`     | SCALE | No       |
| Food        | `entry.250609652`      | SCALE | No       |
| Hospitality | `entry.395815328`      | SCALE | No       |
| Hygiene     | `entry.956551446`      | SCALE | No       |
| Reception   | `entry.1219385526`     | SCALE | No       |

> **Note**: All fields are optional at the Google Form level. Validation happens
> client-side or via API, not at the form submission layer, to avoid blocking
> POST submissions via entry IDs.

---

## Apps Script — Form Creation

```js
function createReviewForm() {
  const form = FormApp.create('Traveler Reviews — AccessibleTravel');

  form.setTitle('Share Your Journey');
  form.setDescription(
    'Help us maintain our standards and inspire others. Every review is sent directly to our management team for review.'
  );

  // --- Rating scales (1 = Poor, 5 = Excellent) ---
  const ratingCategories = [
    'Rating',
    'Comfort',
    'Food',
    'Hospitality',
    'Hygiene',
    'Reception',
  ];

  ratingCategories.forEach((category) => {
    form.addScaleItem()
      .setTitle(category)
      .setBounds(1, 5)
      .setLabels('Poor', 'Excellent')
      .setRequired(true);
  });

  // --- Contact fields ---
  form.addTextItem().setTitle('Full Name').setRequired(true);

  form.addTextItem()
    .setTitle('Email Address')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Please enter a valid email')
        .requireTextIsEmail()
        .build()
    );

  form.addParagraphTextItem()
    .setTitle('Message')
    .setRequired(true);

  // --- Hidden field: tour title (injected client-side) ---
  form.addTextItem()
    .setTitle('Tour Title')
    .setRequired(false);

  // --- Link to a Spreadsheet ---
  const ss = SpreadsheetApp.create('Reviews Data');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Form URL: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Linked Sheet ID: ' + ss.getId());

  // Store IDs for later use
  PropertiesService.getScriptProperties().setProperty('FORM_ID', form.getId());
  PropertiesService.getScriptProperties().setProperty('REVIEWS_SHEET_ID', ss.getId());

  return form;
}
```

---

## Field ID Mapping (for client-side POST)

The Astro component submits directly to Google Forms via `fetch` with `mode: 'no-cors'`.
The entry IDs above are the `name` attributes on the `<input>` elements. When rebuilding
the form in another project, you need these IDs to:

1. **Recreate the form** via `FormApp` — Google auto-generates new entry IDs, so you'll
   need to read them back from the form's published URL or use `form.getItems()` to map
   titles to IDs.
2. **POST from client-side** — use the entry IDs as form field names in `FormData`.

### Reading entry IDs after creation

```js
function getFormEntryIds() {
  const formId = PropertiesService.getScriptProperties().getProperty('FORM_ID');
  const form = FormApp.openById(formId);
  const items = form.getItems();

  const mapping = {};
  items.forEach((item) => {
    const title = item.getTitle();
    const id = item.getId();
    // The entry ID format for pre-filling is entry.<id>
    mapping[title] = `entry.${id}`;
  });

  Logger.log(JSON.stringify(mapping, null, 2));
  return mapping;
}
```

---

## Client-Side Submission Pattern

```js
const ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScW1VahsHSCWY2sAjGlow8KgSzObVMJq5OkGAfT32ekPVerCw/formResponse';

const formData = new FormData();
formData.append('entry.956031060', rating);        // Rating (1-5)
formData.append('entry.1766596268', comfort);       // Comfort (1-5)
formData.append('entry.250609652', food);          // Food (1-5)
formData.append('entry.395815328', hospitality);    // Hospitality (1-5)
formData.append('entry.956551446', hygiene);        // Hygiene (1-5)
formData.append('entry.1219385526', reception);      // Reception (1-5)
formData.append('entry.1770894358', fullName);       // Full Name
formData.append('entry.228567320', email);          // Email Address
formData.append('entry.1360316101', message);       // Message
formData.append('entry.1704160591', tourTitle);      // Tour Title

await fetch(ACTION_URL, { method: 'POST', mode: 'no-cors', body: formData });
```

**Key points:**
- `mode: 'no-cors'` means the response is opaque — no status code, no body readable.
- Success is assumed (no server confirmation). The UI shows a success panel regardless.
- The `#titulo` element is an Astro island that holds the current tour title in `data-titulo`.

---

## Column Names in Linked Sheet

| Column | Header |
| ------ | ------ |
| A      | Timestamp |
| B      | Rating (1-5) |
| C      | Comfort (1-5) |
| D      | Food (1-5) |
| E      | Hospitality (1-5) |
| F      | Hygiene (1-5) |
| G      | Reception (1-5) |
| H      | Full Name |
| I      | Email Address |
| J      | Message |
| K      | Tour Title |

> Column order matches the field creation order in `setup.js`.

---

## Checklist for Frontend Integration

- [x] Run `setup()` to create the form and linked sheet
- [x] Run `getFormEntryIds()` to get the entry IDs
- [x] Use the entry IDs above in your `FormData` POST
- [x] Set `ACTION_URL` to the form's published URL
- [x] Remove `/u/0` from action URL (spec uses `/d/e/` path)
- [x] Remove `required` attributes from form fields (all optional per spec)
- [ ] Test submission end-to-end (form → sheet → Apps Script API → client)
