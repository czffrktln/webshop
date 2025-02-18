import express, {Request, Response} from "express"
import jwt from 'jsonwebtoken'
import getIdToken from '../utils/getIdToken.js'
import { User } from "../models/user.js"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
  const loginCode = req.body
  console.log(loginCode)

  const idToken = await getIdToken(loginCode.code)
  console.log("idToken", idToken);
  
  const payload = jwt.decode(idToken)
  console.log("payload", payload);

  const newUser = await User.create(payload)
})

export default router