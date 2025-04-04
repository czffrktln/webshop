import { log } from "console";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart.js";

const router = express.Router();

type PuzzleType = {
  puzzle_id: string;
  quantity: number;
};

type PuzzleType2 = {
  puzzle: object;
  quantity: number;
};

router.post("/", async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { session_id, puzzles } = req.body;

  // const puzzleArray = puzzles.map((item: any) => ({
  //   puzzle: item.puzzle._id,
  //   quantity: item.quantity,
  // }));

  // console.log("puzzleArray", puzzlesArrayToDatabase);

  const puzzlesArrayToDatabase = puzzles.map((puzzleItem: PuzzleType) => ({
    puzzle: puzzleItem.puzzle_id,
    quantity: puzzleItem.quantity,
  }));

  const existingCart = await Cart.findOne({ session_id: session_id });
  if (!existingCart) {
    const newCart = await Cart.create({
      session_id: session_id,
      puzzles: puzzlesArrayToDatabase,
    });
    console.log("newcart", newCart);
    // if (!newCart) return res
    return res.sendStatus(200);
  } else {
    const updatedCart = await Cart.findByIdAndUpdate(
      existingCart._id,
      req.body
    );
    console.log("updatedcart", updatedCart);

    const updatedCartToSend = await Cart.findOne({
      session_id: session_id,
    }).populate({
      path: "puzzles.puzzle",
      // select: ["puzzle_id", "sessionId"],
    });

    // return
    res.send(updatedCartToSend);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const session_id = req.params.id;

  console.log("session_id getből", session_id);
  const existingCart = await Cart.findOne({ session_id: session_id }).populate({
    path: "puzzles.puzzle",
    // select: ["puzzle_id", "sessionId"],
  });

  console.log("EXISTING cart", existingCart);

  res.send(existingCart);
});

export default router;
