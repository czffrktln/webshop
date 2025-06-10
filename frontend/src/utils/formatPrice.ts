export default function formatPrice(price: number | string): string {
  const numberTypePrice = typeof price === "string" ? Number(price) : price
  return new Intl.NumberFormat("de-DE").format(numberTypePrice).replace(/\./, " ");
}


