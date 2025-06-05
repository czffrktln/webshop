export default function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE").format(price).replace(/\./, " ");
}
