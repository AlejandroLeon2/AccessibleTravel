import { toursDestinos } from "../data/toursDestinos";

function generateTourDestinationMenu(
  destinations
) {
  const tour = destinations.map(({ title, titleLink }) => ({
    label: `Tours ${title}`,
    href: `/destino/${titleLink}`,
  }));
  return [

    ...tour,
  ];
}


export const headerMenu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tour Destination",
    href: "/tourDestino",
    children: generateTourDestinationMenu(toursDestinos),
  },
  {
    label: "Group Tours",
    href: "/groupTours",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Contact Us", href: "/contactUs" },
      { label: "Términos y condiciones", href: "/terminosCondiciones" },
      { label: "About Us", href: "/aboutUs" },
    ],
  },
];