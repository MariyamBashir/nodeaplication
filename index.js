console.log("maryam");
const express = require("express");
const fs = require ("fs");

const app = express();
app.use(express.json());

const CART_FILE = "cart.json";

app.get("/cart", (req, res) => {
  const data = fs.readFileSync(CART_FILE, "utf-8");
  res.json(JSON.parse(data));
});

app.post("/cart", (req, res) => {
  const cart = JSON.parse(fs.readFileSync(CART_FILE));

  const newItem = {
    id: Date.now(),
    productId: req.body.productId,
    productName: req.body.productName,
    price: req.body.price,
    quantity: req.body.quantity
  };

  cart.push(newItem);
  fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2));

  res.status(201).json({
    message: "Item added to cart",
    item: newItem
  });
});

app.listen(3000, () => {
  console.log("Cart server running on port 3000");
});



