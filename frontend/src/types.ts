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

// export interface ResponseType {
//   createdAt: string;
//   email: string;
//   given_name: string;
//   iat: number;
//   name: string;
//   picture: string;
//   sub: string;
//   updatedAt: string;
//   __v: number;
//   _id: string;
// }

// export type UserType = Pick<
//   ResponseType,
//   "email" | "given_name" | "name" | "picture" | "sub" | "_id"
// >;

export interface UserType {
  email: string;
  given_name: string;

  name: string;
  picture: string;
  sub: string;

  _id: string;
}
