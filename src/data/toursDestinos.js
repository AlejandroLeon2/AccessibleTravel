import travelsPeruEN from "../data/peru/peru-en/travels.json" assert { type: "json" };
import travelsPeruES from "../data/peru/peru-es/travels.json" assert {type: "json"}

export const toursDestinos = [
  {
    "title": "Perú",
    "titleLink": "peru",
    "url": "/images/machu.webp",
    "destinosEN": travelsPeruEN,
    "destinosES": travelsPeruES
  },
  {
    "title": "Ecuador",
    "titleLink": "ecuador",
    "destinosEn": [],
    "destinosES": []
  },
  {
    "title": "Argentina",
    "titleLink": "argentina",
    "destinosEn": [],
    "destinosES": []
  },
  {
    "title": "Chile",
    "titleLink": "chile",
    "destinosEn": [],
    "destinosES": []
  },
  {
    "title": "Brasil",
    "titleLink": "brazil",
    "destinosEn": [],
    "destinosES": []
  },
  {
    "title": "Colombia",
    "titleLink": "colombia",
    "destinosEn": [],
    "destinosES": []
  },
  {
    "title": "Bolivia",
    "titleLink": "bolivia",
    "destinosEn": [],
    "destinosES": []
  }
];

export const destinosEs = [...travelsPeruES];
export const destinosEn = [...travelsPeruEN];