
export default function encodeTag(data) {
  if (typeof data !== 'string') return '';
  return data.replaceAll(' ', '-').toLowerCase();
};
