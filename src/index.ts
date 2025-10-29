import express from "express";
import { CartController } from "./cart/cart.controller";

const app = express();
app.use(express.json());

const controller = new CartController();
app.use("/cart", controller.router);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
