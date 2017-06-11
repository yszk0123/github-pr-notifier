export default function normalizeISODateString(dateString) {
  return dateString.replace(/\.\d+/, '');
}
