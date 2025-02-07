export interface PuzzleType {
  _id: string,
  id: string,
  brand: string,
  title: string,
  pieces: string,
  serial_number: string,
  price: string,
  size: string,
  available: boolean,
  image_link: string,
  category: string[],
  rating: string,
  review: string
}