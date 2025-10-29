import { Router } from "express";
import { CartService } from "./cart.service";

export class CartController {
  public router = Router();
  private service = new CartService();

  constructor() {
    this.router.post("/items", (req, res) => {
      const { productId, quantity } = req.body;
      const result = this.service.addItem(productId, quantity);
      res.json(result);
    });

    this.router.get("/", (req, res) => {
      res.json(this.service.getCart());
    });

    this.router.delete("/", (req, res) => {
      this.service.clear();
      res.status(204).send();
    });
  }
}
