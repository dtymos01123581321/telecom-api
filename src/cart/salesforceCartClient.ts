export class SalesforceCartClient {
  private cart: any = {};
  private contextExpiry = new Date(Date.now() + 5 * 60 * 1000);
  private createdAt = new Date();

  getContext() {
    if (Date.now() > this.contextExpiry.getTime()) {
      throw new Error('Context expired');
    }
    return {
      ...this.cart,
      _meta: {
        createdAt: this.createdAt.toISOString(),
        expiresAt: this.contextExpiry.toISOString(),
      },
    };
  }

  addItem(productId: string, quantity: number) {
    this.cart[productId] = (this.cart[productId] || 0) + quantity;
  }

  clearCart() {
    this.cart = {};
  }
}
