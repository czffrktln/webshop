export interface PuzzleType {
  _id: string;
  id: string;
  brand: string;
  title: string;
  pieces: string;
  serial_number: string;
  price: string;
  size: string;
  available: boolean;
  image_link: string;
  category: string[];
  rating: string;
  review: string;
}

export interface UserType {
  email: string;
  given_name: string;
  name: string;
  picture: string;
  sub: string;
  _id: string;
}

export interface CartItemType {
  puzzle: PuzzleType
  quantity: number
}

export interface CurrentCartType {
  session_id: string,
  puzzles: {
    puzzle_id: string, 
    quantity: number
  }[], 
}

