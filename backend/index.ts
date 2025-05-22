import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import login from "./routes/login.js";
import user from "./routes/user.js";
import puzzle from "./routes/puzzle.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/user", user);
app.use("/puzzle", puzzle);
app.use("/cart", cart);
app.use("/order", order);

export default app;
