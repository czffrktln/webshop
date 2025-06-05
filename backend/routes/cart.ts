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
  console.log("existing cart", existingCart);
  
  if (!existingCart) {
    const newCart = await Cart.create({
      session_id: session_id,
      puzzles: puzzlesArrayToDatabase,
    });
    // console.log("newcart", newCart);
    // if (!newCart) return res
    return res.sendStatus(200);
  } else {
    const updatedCart = await Cart.findByIdAndUpdate(
      existingCart._id,
      req.body
    );

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

  const existingCart = await Cart.findOne({ session_id: session_id }).populate({
    path: "puzzles.puzzle",
  });

  if (!existingCart) {
    const newCart = await Cart.create({ session_id: session_id, puzzles: [] });
    res.send(newCart);
  } else {
    res.send(existingCart);
  }
});

export default router;
