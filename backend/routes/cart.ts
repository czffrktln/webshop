import { log } from "console";
import express, { Request, Response } from "express";

const router = express.Router()

router.post("/", async(req: Request, res: Response) => {
  console.log("req.body", req.body);
  res.send({"valami": "valami"})
})

export default router