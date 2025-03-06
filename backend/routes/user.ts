import express, { Request, Response } from "express";
import { User } from "../models/user.js";
import { hashPassword } from "../utils/hash.js";

const router = express.Router();

router.post("/registration", async (req: Request, res: Response) => {
  console.log("req.body", req.body);

  const { name, email, password } = req.body.data

  const findUser = await User.findOne({email: email})
  if (findUser) return res.sendStatus(403)
  
  const newUser = await User.create({ given_name: name, email, password: hashPassword(password)})

  return res.sendStatus(200)
});

export default router;
