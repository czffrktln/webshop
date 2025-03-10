import express, { Request, Response } from "express";
import { User } from "../models/user.js";
import { hashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) throw "Secret key is required";

type newUserDataType = {
  _id: string,
  given_name: string,
  email: string
}

router.post("/registration", async (req: Request, res: Response) => {
  console.log("req.body", req.body);

  const { name, email, password } = req.body.data

  const findUser = await User.findOne({email: email})
  if (findUser) return res.sendStatus(403)
  
  const newUser = await User.create({ given_name: name, email, password: hashPassword(password)})

  const newUserData: newUserDataType = { _id: newUser._id.toString(), given_name: name, email}
  console.log("newuser", newUser);
  // console.log("newuserdata", newUserData);
  
  const sessionToken = jwt.sign(newUserData, secretKey)

  return res.status(200).json(sessionToken)
});

export default router;
