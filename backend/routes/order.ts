import express, { Request, Response } from "express";
import { Order } from "../models/order.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  console.log("request:", req.body);

  const newOrder = await Order.create({ cart: req.body });
  console.log("new order:", newOrder);
  res.send(newOrder);
});

export default router;
