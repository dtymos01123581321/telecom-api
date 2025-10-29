import { Router } from "express";
import { CartService } from "./cart.service";

export class CartController {
  public router = Router();
  private service = new CartService();

  constructor() {
    this.router.post("/items", (req, res) => {
      try {
        const { productId, quantity } = req.body;
        if (!productId || typeof quantity !== "number") {
          return res.status(400).json({ error: "Invalid productId or quantity" });
        }
        const result = this.service.addItem(productId, quantity);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
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
