/**
 * Utility: look up a menu item (and optionally a child) by key from a loaded menu items array.
 * Useful in pages to get the localized label and coverImage for PortadaStatic.
 */
export interface MenuItem {
  key: string;
  label: string;
  href: string;
  coverImage: string;
  children?: MenuItem[];
}

/**
 * Find a top-level menu item or a child item by its `key`.
 * Returns { label, coverImage } or a fallback if not found.
 */
export function getMenuPageData(items, key, lang = "en") {
  const item = items.find((i) => i.key === key);
  if (!item) return {};
  return {
    labels: item.labels,
    coverImage: item.coverImage,
    label: item.labels[lang], // compatibilidad con destructuración antigua
  };
}
