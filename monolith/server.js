const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const products = [
  { id: 1, name: 'Everyday Backpack', category: 'Accessories', price: 1299, emoji: '🎒', description: 'A lightweight bag for everyday adventures.' },
  { id: 2, name: 'Wireless Headphones', category: 'Electronics', price: 1999, emoji: '🎧', description: 'Comfortable listening, wherever you go.' },
  { id: 3, name: 'Classic Sneakers', category: 'Footwear', price: 2499, emoji: '👟', description: 'Clean style made for all-day comfort.' },
  { id: 4, name: 'Insulated Bottle', category: 'Lifestyle', price: 599, emoji: '🥤', description: 'Keep your drink close throughout the day.' }
];
let orders = [];
let nextOrderId = 1001;
app.get('/api/products', (_req, res) => res.json(products));
app.get('/api/orders', (_req, res) => res.json(orders));
app.post('/api/orders', (req, res) => {
  const { items, customerName } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Your cart is empty.' });
  const lines = [];
  for (const item of items) {
    const product = products.find(p => p.id === Number(item.id));
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !Number.isFinite(quantity) || quantity < 1 || quantity > 20) return res.status(400).json({ error: 'Please check your cart quantities.' });
    lines.push({ id: product.id, name: product.name, price: product.price, quantity });
  }
  const order = { id: nextOrderId++, customerName: String(customerName || 'Guest').trim().slice(0, 80) || 'Guest', items: lines, total: lines.reduce((sum, x) => sum + x.price * x.quantity, 0), createdAt: new Date().toISOString() };
  orders.unshift(order);
  res.status(201).json(order);
});
app.listen(PORT, () => console.log(`E-Commerce Monolith running at http://localhost:${PORT}`));
