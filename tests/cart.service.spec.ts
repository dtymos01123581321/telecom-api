import { CartService } from "../src/cart/cart.service";

describe("CartService", () => {
  it("should add item to cart", () => {
    const service = new CartService();
    const result = service.addItem("A1", 2);
    expect(result["A1"]).toBe(2);
  });

  it("should clear cart", () => {
    const service = new CartService();
    service.addItem("B2", 1);
    service.clear();
    expect(Object.keys(service.getCart()).length).toBe(0);
  });
});
