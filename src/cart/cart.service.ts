import { SalesforceCartClient } from "./salesforceCartClient";

export class CartService {
  private client = new SalesforceCartClient();

  addItem(productId: string, quantity: number = 1) {
    if (quantity <= 0) throw new Error("Quantity must be positive");
    this.client.addItem(productId, quantity);
    const ctx = this.client.getContext();
    const { _meta, ...items } = ctx;
    return items;
  }

  getCart() {
    const ctx = this.client.getContext();
    const { _meta, ...items } = ctx;
    return items;
  }

  clear() {
    this.client.clearCart();
  }
}
