const baseGroupTour = {
  operator: "Accessible Travel Peru",
  duration: "",
  siempreFecha: false,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  rating: 0,
  reviews: 0,
  recomendado: false,
  agotado: false,
  groupSize: "",
  location: "",
  description: "",
  highlights: [],
  includes: [],
  excludes: [],
  packages: [{ name: "", price: "", deposit: "" }],
  addOns: [],
  itinerary: [{ day: 1, title: "", description: "" }],
  links: { book: "", brochure: "", inquire: "" },
};

export const defaultGroupTourEs = () => ({
  ...baseGroupTour,
  title: "Nuevo tour grupal",
  titleLink: "nuevo-tour-grupal",
  images: [{ link: "/images/machu.webp", alt: "Imagen del tour", title: "" }],
});

export const defaultGroupTourEn = () => ({
  ...baseGroupTour,
  title: "New group tour",
  titleLink: "new-group-tour",
  images: [{ link: "/images/dieciochoprincipal.webp", alt: "Tour image", title: "" }],
});
