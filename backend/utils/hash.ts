import bcrypt from 'bcryptjs'
import { saltRounds } from "./constants.js";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}