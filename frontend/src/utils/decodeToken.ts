import { jwtDecode } from "jwt-decode";
import { UserType } from "../types";

export const decodeToken = (token: string): UserType => {
  const decodedToken = jwtDecode(token)
  const { email, given_name, name, picture, sub, _id } = decodedToken as UserType;
  return {email, given_name, name, picture, sub, _id}
}

