import { log } from "console";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart.js";

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { session_id } = req.body

  const existingCart = await Cart.findOne({session_id: session_id})
  if (!existingCart) {
    const newCart = await Cart.create(req.body)
    // if (!newCart) return res
    return res.sendStatus(200)
  } else {
    const updatedCart = await Cart.findByIdAndUpdate(existingCart._id, req.body)
    // return
  }
  

  

  res.send({"valami": "valami"})
})

export default router