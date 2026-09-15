import en from "../data/locales/en.json";
import es from "../data/locales/es.json";

/**
 * Resuelve el JSON de idioma correcto según el locale activo.
 * Importa ambos JSON estáticamente y elige con ternario (evita import() dinámico).
 *
 * @param locale - Astro.currentLocale ("en" | "es" | undefined)
 * @returns { lang, lenguaje } - lang es el string del locale, lenguaje es el JSON
 */
export function getLocaleData(locale: string | undefined) {
  const lang = locale ?? "en";
  const lenguaje = lang === "es" ? es : en;
  return { lang, lenguaje };
}

/**
 * Retorna el nombre de la colección de tours según el locale.
 *
 * @param locale - Astro.currentLocale
 * @param type - "global" para tours globales, "grupal" para tours grupales
 * @returns Nombre de la colección: "toursGlobalesEs" | "toursGlobalesEn" | "toursGrupalesEs" | "toursGrupalesEn"
 */
export function getTourCollectionName(
  locale: string | undefined,
  type: "global" | "grupal"
) {
  const suffix = locale === "es" ? "Es" : "En";
  return type === "global"
    ? `toursGlobales${suffix}`
    : `toursGrupales${suffix}`;
}

/**
 * Retorna las rutas estáticas para el parámetro [locale].
 * Úsalo en getStaticPaths() de cada página dentro de src/pages/[locale]/
 *
 * @returns Array de params para getStaticPaths()
 */
export function getLocaleStaticPaths() {
  return [
    { params: { locale: "en" } },
    { params: { locale: "es" } },
  ];
}

/**
 * Resuelve la imagen de portada y el label para una página según el locale.
 * Centraliza la lógica que se repetía en 7+ páginas.
 *
 * @param menuItems - Array de ítems del menú (menuData.items)
 * @param pageKey - Key de la página ("AboutUs", "Blog", "ContactUs", etc.)
 * @param lang - Locale activo ("en" | "es")
 * @returns { pageLabel, coverImage, labels }
 */
export function getPageCoverData(
  menuItems: any[],
  pageKey: string,
  lang: string
) {
  const item = menuItems.find((i: any) => i.key === pageKey);
  if (!item) return { pageLabel: "", coverImage: "", labels: {} };
  return {
    pageLabel: item.labels[lang] ?? item.labels.en ?? "",
    coverImage: item.coverImage,
    labels: item.labels,
  };
}
