import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getIdToken from "../utils/getIdToken.js";
import { User } from "../models/user.js";
import { z } from "zod";
import { safeParse } from "../utils/safeParse.js";

// import dotenv from "dotenv";
// dotenv.config();

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) throw "Secret key is required";

const PayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string(),
  given_name: z.string()
})

type PayloadType = z.infer<typeof PayloadSchema>

router.post("/", async (req: Request, res: Response) => {
  const loginCode = req.body;

  const idToken = await getIdToken(loginCode.code);

  const payload = jwt.decode(idToken);
  console.log("payload", payload);
  const safeParsedPayload = safeParse(PayloadSchema, payload)
  if (!safeParsedPayload) return res.sendStatus(500)

  const findUser = await User.findOne({sub: safeParsedPayload.sub})

  if (!findUser) {
    const newUser = await User.create(payload);
    const sessionToken = jwt.sign(newUser.toJSON(), secretKey);
    res.send(sessionToken);
  } else {
    const updatedUser = await User.findOneAndUpdate({sub: safeParsedPayload.sub}, {$set: safeParsedPayload}, {returnNewDocument: true})
    if (!updatedUser) return res.sendStatus(500)
    
    const sessionToken = jwt.sign(updatedUser.toJSON(), secretKey)
    res.send(sessionToken)
  }

});

export default router;
