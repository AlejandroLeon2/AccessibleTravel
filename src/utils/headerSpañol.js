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
    label:"AllToursPeru", //"Tour Destination",
    href:"/destino/peru"   //"/tourDestino",
   // children:generateTourDestinationMenu(toursDestinos),
  },
  {
    label: "GroupTours",
    href: "/groupTours",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "AboutUs",
    href: "/about",
    children: [
      { label: "ContactUs", href: "/contactUs" },
      { label: "TermsAndConditions", href: "/terminosCondiciones" },
      { label: "AboutUs", href: "/aboutUs" },
    ],
  },
];