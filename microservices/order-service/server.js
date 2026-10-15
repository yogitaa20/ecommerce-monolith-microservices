
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;
const DATA_DIR = process.env.DATA_DIR || '/data';
const DATA_FILE = path.join(DATA_DIR, 'orders.json');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Create the data folder and load previously saved orders.
fs.mkdirSync(DATA_DIR, { recursive: true });

let orders = [];
let nextOrderId = 2001;

try {
  if (fs.existsSync(DATA_FILE)) {
    const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    orders = saved.orders || [];
    nextOrderId = saved.nextOrderId || 2001;
  }
} catch (error) {
  console.error('Could not load saved orders:', error);
  process.exit(1);
}

function saveOrders() {
  const tempFile = DATA_FILE + '.tmp';
  fs.writeFileSync(
    tempFile,
    JSON.stringify({ orders, nextOrderId }, null, 2)
  );
  fs.renameSync(tempFile, DATA_FILE);
}

app.get('/health', (_req, res) => {
  res.json({ service: 'order-service', status: 'ok' });
});

app.get('/api/orders', (_req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { items, customerName } = req.body || {};

  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Your cart is empty.' });
  }

  const lines = [];

  for (const item of items) {
    const id = Number(item.id);
    const quantity = Math.floor(Number(item.quantity));
    const price = Number(item.price);

    if (
      !Number.isInteger(id) || id < 1 ||
      !Number.isFinite(quantity) || quantity < 1 || quantity > 20 ||
      !Number.isFinite(price) || price < 1
    ) {
      return res.status(400).json({
        error: 'Please check your cart quantities.'
      });
    }

    lines.push({
      id,
      name: String(item.name || `Product ${id}`).slice(0, 100),
      price,
      quantity
    });
  }

  const order = {
    id: nextOrderId++,
    customerName:
      String(customerName || 'Guest').trim().slice(0, 80) || 'Guest',
    items: lines,
    total: lines.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString()
  };

  orders.unshift(order);

  try {
    saveOrders();
    res.status(201).json(order);
  } catch (error) {
    orders.shift();
    nextOrderId--;
    console.error('Could not save order:', error);
    res.status(500).json({ error: 'Could not save your order.' });
  }
});

app.listen(PORT, () => {
  console.log(`Order Service listening on ${PORT}`);
});
