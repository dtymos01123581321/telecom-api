import { SalesforceCartClient } from "./salesforceCartClient";

export class CartService {
  private client = new SalesforceCartClient();

  addItem(productId: string, quantity: number) {
    this.client.addItem(productId, quantity);
    return this.client.getContext();
  }

  getCart() {
    return this.client.getContext();
  }

  clear() {
    this.client.clearCart();
  }
}
