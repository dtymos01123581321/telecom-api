import { CartService } from "../../src/cart/cart.service";
import { SalesforceCartClient } from "../../src/cart/salesforceCartClient";

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

  it("should throw error when quantity is negative", () => {
    const service = new CartService();
    expect(() => service.addItem("A1", -1)).toThrow("Quantity must be positive");
  });

  it("should return meta information with timestamps", () => {
    const client = new SalesforceCartClient();
    const context = client.getContext();

    expect(context._meta).toBeDefined();
    expect(context._meta.createdAt).toMatch(/T/);
    expect(context._meta.expiresAt).toMatch(/T/);
  });

});
