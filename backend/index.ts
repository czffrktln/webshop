import dotenv from 'dotenv'
dotenv.config()

import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json())

const mongourl = process.env.MONGOURL as string
const port = process.env.PORT

mongoose.connect(mongourl, {})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log('Server is running on port ' + port);
    })
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  })

app.get("/", function (req: Request, res: Response) {
  res.send("Hello, World!");
});


export default app