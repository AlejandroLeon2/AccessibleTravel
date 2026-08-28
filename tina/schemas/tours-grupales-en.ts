import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';
import { defaultGroupTourEn } from '../defaults/group-tour';

export const toursGrupalesEn = {
  name: 'toursGrupalesEn',
  label: 'Group Tours EN',
  path: 'src/content/tours-grupales/en',
  format: 'json',
  defaultItem: defaultGroupTourEn,
  fields: [
    { type: 'string', name: 'title', label: 'Tour title', isTitle: true, required: true },
    {
      type: 'string', name: 'titleLink', label: 'URL slug', required: true,
      ui: { validate: (value: unknown) => typeof value !== 'string' || !value ? 'The slug is required' : (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? null : 'Use lowercase letters, numbers, and single hyphens only') },
    },
    { type: 'string', name: 'operator', label: 'Tour operator' },
    { type: 'string', name: 'duration', label: 'Tour duration' },
    { type: 'boolean', name: 'siempreFecha', label: 'Show countdown' },
    { type: 'datetime', name: 'startDate', label: 'Tour start date' },
    { type: 'datetime', name: 'endDate', label: 'Tour end date' },
    {
      type: 'number', name: 'rating', label: 'Tour rating',
      ui: { validate: (value: unknown) => typeof value !== 'number' || (value >= 0 && value <= 5) ? null : 'The rating must be between 0 and 5' },
    },
    {
      type: 'number', name: 'reviews', label: 'Number of reviews',
      ui: { validate: (value: unknown) => typeof value !== 'number' || (Number.isInteger(value) && value >= 0) ? null : 'Reviews must be a non-negative integer' },
    },
    { type: 'boolean', name: 'recomendado', label: 'Recommended tour' },
    { type: 'boolean', name: 'agotado', label: 'Sold out' },
    { type: 'string', name: 'groupSize', label: 'Group size' },
    { type: 'string', name: 'location', label: 'Tour location' },
    { type: 'string', name: 'description', label: 'Tour description', ui: { component: 'textarea' } },
    { type: 'string', name: 'highlights', label: 'Tour highlights', list: true },
    { type: 'string', name: 'includes', label: 'Included services', list: true },
    { type: 'string', name: 'excludes', label: 'Excluded services', list: true },
    {
      type: 'object', name: 'packages', label: 'Price packages', list: true,
      description: 'Pricing options for each traveler type. Example: Wheelchair User, $3,845, deposit $500.',
      fields: [
        { type: 'string', name: 'name', label: 'Package name', description: 'Traveler category, for example Wheelchair User or Partner.' },
        { type: 'string', name: 'price', label: 'Price', description: 'Displayed package price, for example $3,845.' },
        { type: 'string', name: 'deposit', label: 'Deposit', description: 'Required deposit, for example $500. Leave empty when there is no deposit.' },
      ],
    },
    { type: 'string', name: 'addOns', label: 'Additional services', list: true },
    {
      type: 'object', name: 'itinerary', label: 'Detailed itinerary', list: true,
      description: 'One object per travel day, such as Day 1: Arrival in Lima – Welcome to Peru.',
      fields: [
        { type: 'number', name: 'day', label: 'Day number', description: 'Sequential day number, for example 1.' },
        { type: 'string', name: 'title', label: 'Day title', description: 'Short title, for example Arrival in Lima – Welcome to Peru.' },
        { type: 'string', name: 'description', label: 'Day description', description: 'Detailed activities, accessibility and included assistance for the day.', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object',
      name: 'images',
      label: 'Tour images',
      list: true,
      description: 'Images displayed in the tour gallery.',
      ui: {
        visualSelector: true,
        itemProps: (item) => ({
          label: item?.title || item?.alt || 'Unnamed image',
        }),

      }
      ,
      fields: [
        {
          type: 'image',
          name: 'link',
          label: 'Image path',
          required: true,
          ui: imagePathUi,
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Alt text',
          required: true,
        },
        {
          type: 'string',
          name: 'title',
          label: 'Image title',
          description: 'Optional title shown as image metadata.',
        },
      ],
    }
    ,
    {
      type: 'object', name: 'links', label: 'Important links',
      description: 'Booking and information links. The booking URL must include the WeTravel package ID at the end when available.',
      fields: [
        { type: 'string', name: 'book', label: 'Booking link', description: 'Example: https://accessibletravelperu.wetravel.com/trips/...-0188439377.' },
        { type: 'string', name: 'brochure', label: 'Brochure link', description: 'URL or display text for the brochure.' },
        { type: 'string', name: 'inquire', label: 'Inquiry link', description: 'URL or display text for inquiries.' },
      ],
    },
  ],
} as unknown as Collection<false>;
