import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getIdToken from "../utils/getIdToken.js";
import { User } from "../models/user.js";

// import dotenv from "dotenv";
// dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) throw "Secret key is required";

router.post("/", async (req: Request, res: Response) => {
  const loginCode = req.body;
  console.log(loginCode);

  const idToken = await getIdToken(loginCode.code);
  console.log("idToken", idToken);

  const payload = jwt.decode(idToken);
  console.log("payload", payload);

  const newUser = await User.create(payload);
  const sessionToken = jwt.sign(newUser.toJSON(), secretKey);
  res.send(sessionToken);
});

export default router;
