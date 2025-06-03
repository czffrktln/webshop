import express, { Request, Response } from "express";
import { Order } from "../models/order.js";
import { log } from "console";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const newOrder = await Order.create({ cart: req.body });
  res.send(newOrder);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  console.log("ordersbyid request:", id, new Date());
  const orders = await Order.find({"cart.user_id": id })
  
  res.send(orders)
} )

export default router;
