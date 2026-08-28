export const imagePathUi = {
  format: (value: unknown) => {
    if (typeof value !== 'string') return '';
    if (!value || value.startsWith('/') || /^https?:\/\//.test(value)) return value || '';
    return `/${value}`;
  },
  parse: (value: unknown) => {
    if (typeof value !== 'string') return '';
    if (!value || value.startsWith('/') || /^https?:\/\//.test(value)) return value || '';
    return `/${value}`;
  },
};
