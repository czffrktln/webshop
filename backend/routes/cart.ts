import { log } from "console";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart.js";

const router = express.Router();

type PuzzleType = {
  puzzle_id: string, 
  quantity: number
}

router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { session_id, puzzles } = req.body;

  const puzzlesArrayToDatabase = puzzles.map((puzzleItem: PuzzleType) => ({
    puzzle: puzzleItem.puzzle_id, quantity: puzzleItem.quantity
  }))

  const existingCart = await Cart.findOne({ session_id: session_id });
  if (!existingCart) {
    const newCart = await Cart.create({session_id: session_id, puzzles: puzzlesArrayToDatabase });
    console.log("newcart", newCart);
    // if (!newCart) return res
    return res.sendStatus(200);
  } else {
    const updatedCart = await Cart.findByIdAndUpdate(
      existingCart._id,
      req.body
    );
    console.log("updatedcart", updatedCart);
    
    // return
  }

  res.send({ valami: "valami" });
});

router.get("/:id", async (req: Request, res: Response) => {
  const session_id = req.params.id;

  console.log("session_id getből", session_id);
  const existingCart = await Cart.findOne({ session_id: session_id }).populate({
    path: "puzzles.puzzle",
    // select: ["puzzle_id", "sessionId"],
  });

  console.log("EXISTING cart", existingCart);

  res.send({resp: existingCart});
});

export default router;
