import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

export const toursGlobalesEn = {
  name: 'toursGlobalesEn',
  label: 'Tours Peru EN',
  path: 'src/content/tours-global/peru/en',
  format: 'json',
  fields: [
    { type: 'string', name: 'title', label: 'Tour title', isTitle: true, required: true },
    { type: 'string', name: 'titleLink', label: 'URL slug', required: true },
    { type: 'string', name: 'operator', label: 'Tour operator' },
    { type: 'string', name: 'duration', label: 'Tour duration' },
    { type: 'boolean', name: 'siempreFecha', label: 'Show countdown' },
    { type: 'string', name: 'startDate', label: 'Start date' },
    { type: 'string', name: 'endDate', label: 'End date' },
    { type: 'number', name: 'rating', label: 'Rating' },
    { type: 'number', name: 'reviews', label: 'Reviews' },
    { type: 'boolean', name: 'recomendado', label: 'Recommended' },
    { type: 'boolean', name: 'agotado', label: 'Sold out' },
    { type: 'string', name: 'groupSize', label: 'Group size' },
    { type: 'string', name: 'location', label: 'Location' },
    { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
    { type: 'string', name: 'slogan', label: 'Slogan' },
    { type: 'string', name: 'contact', label: 'Contact information' },
    { type: 'string', name: 'highlights', label: 'Highlights', list: true },
    { type: 'string', name: 'includes', label: 'Included services', list: true },
    { type: 'string', name: 'excludes', label: 'Excluded services', list: true },
    {
      type: 'object', name: 'packages', label: 'Price packages', list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Package name' },
        { type: 'string', name: 'capacity', label: 'Capacity' },
        { type: 'string', name: 'price', label: 'Price' },
        { type: 'string', name: 'deposit', label: 'Deposit' },
        { type: 'string', name: 'description', label: 'Description' },
      ],
    },
    {
      type: 'object', name: 'addOns', label: 'Additional services', list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Name' },
        { type: 'string', name: 'price', label: 'Price' },
        { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'itinerary', label: 'Detailed itinerary', list: true,
      fields: [
        { type: 'number', name: 'day', label: 'Day number' },
        { type: 'string', name: 'time', label: 'Time' },
        { type: 'string', name: 'title', label: 'Day title' },
        { type: 'string', name: 'description', label: 'Day description', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'images', label: 'Tour images', list: true,
      fields: [
        { type: 'image', name: 'link', label: 'Image path', required: true, ui: imagePathUi },
        { type: 'string', name: 'alt', label: 'Alt text', required: true },
        { type: 'string', name: 'title', label: 'Image title' },
      ],
    },
    {
      type: 'object', name: 'links', label: 'Important links',
      fields: [
        { type: 'string', name: 'book', label: 'Booking link' },
        { type: 'string', name: 'brochure', label: 'Brochure link' },
        { type: 'string', name: 'inquire', label: 'Inquiry link' },
      ],
    },
  ],
} as unknown as Collection<false>;
