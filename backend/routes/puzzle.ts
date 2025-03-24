import express, { Request, Response } from "express"

import { Puzzle } from "../models/puzzle.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const puzzles = await Puzzle.find()
  res.send(puzzles)
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const puzzle = await Puzzle.findById({_id: id})
  if (!puzzle) return res.sendStatus(404)
  res.send(puzzle)

})

export default router;