export class SalesforceCartClient {
  private cart: any = {};
  private contextExpiry = new Date(Date.now() + 5 * 60 * 1000);

  getContext() {
    if (Date.now() > this.contextExpiry.getTime()) {
      throw new Error('Context expired');
    }
    return this.cart;
  }

  addItem(productId: string, quantity: number) {
    this.cart[productId] = (this.cart[productId] || 0) + quantity;
  }

  clearCart() {
    this.cart = {};
  }
}
