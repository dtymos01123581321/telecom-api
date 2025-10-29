import express from "express";
import request from "supertest";
import { CartController } from "../../src/cart/cart.controller";

describe("Integration: Telecom Experience API", () => {
  let app: express.Express;

  const buildApp = () => {
    const a = express();
    a.use(express.json());
    a.get("/health", (_, res) => res.json({ status: "ok" }));
    a.use("/cart", new CartController().router);
    return a;
  };

  beforeEach(() => {
    app = buildApp();
  });

  it("should return health status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("should add an item to the cart", async () => {
    const res = await request(app)
      .post("/cart/items")
      .send({ productId: "A1", quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("A1", 2);
  });

  it("should accumulate quantity when adding same product twice", async () => {
    await request(app).post("/cart/items").send({ productId: "A1", quantity: 2 });
    const res = await request(app).post("/cart/items").send({ productId: "A1", quantity: 3 });
    expect(res.body["A1"]).toBe(5);
  });

  it("should return current cart state", async () => {
    await request(app)
      .post("/cart/items")
      .send({ productId: "A1", quantity: 2 });

    const res = await request(app).get("/cart");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ A1: expect.any(Number) });
  });


  it("should return 400 for invalid payload", async () => {
    const res = await request(app).post("/cart/items").send({ productId: "", quantity: "x" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should clear the cart", async () => {
    await request(app).post("/cart/items").send({ productId: "X9", quantity: 1 });
    const res = await request(app).delete("/cart");
    expect(res.status).toBe(204);

    const after = await request(app).get("/cart");
    expect(Object.keys(after.body).length).toBe(0);
  });
});
