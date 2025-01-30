import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import { Puzzle } from "./models/puzzle.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async function (req: Request, res: Response) {
  const puzzles = await Puzzle.find()
  res.send(puzzles)
});

export default app;
