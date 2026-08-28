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
export function getMenuPageData(
  items: MenuItem[],
  key: string,
  fallbackImage = "/images/new2principal.webp",
  fallbackLabel = ""
): { label: string; coverImage: string } {
  // Search top-level items
  for (const item of items) {
    if (item.key === key) {
      return { label: item.label, coverImage: item.coverImage };
    }
    // Search children
    if (item.children) {
      for (const child of item.children) {
        if (child.key === key) {
          return { label: child.label, coverImage: child.coverImage };
        }
      }
    }
  }
  return { label: fallbackLabel, coverImage: fallbackImage };
}
