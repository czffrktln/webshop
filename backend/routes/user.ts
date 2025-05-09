import express, { Request, Response } from "express";
import { User } from "../models/user.js";
import { hashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import bcrypt from "bcryptjs";

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) throw "Secret key is required";

type newUserDataType = {
  _id: string;
  given_name: string;
  email: string;
};

router.post("/registration", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email: email });
  if (findUser) return res.sendStatus(403);

  const newUser = await User.create({
    given_name: name,
    email,
    password: hashPassword(password),
  });

  const newUserData: newUserDataType = {
    _id: newUser._id.toString(),
    given_name: name,
    email,
  };

  const sessionToken = jwt.sign(newUserData, secretKey);

  return res.status(200).json(sessionToken);
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email: email });
  if (!findUser) return res.sendStatus(403);

  bcrypt.compare(password, findUser.password!, function (err, result) {
    if (result) {
      const sessionToken = jwt.sign(findUser.toJSON(), secretKey);
      return res.status(200).json(sessionToken);
    } else {
      return res.sendStatus(403);
    }
  });
});

export default router;
