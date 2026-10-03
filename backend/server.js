const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mali Commerce API is running' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }

  return res.json(product);
});

app.post('/api/orders', (req, res) => {
  const { customer, items } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ message: 'Commande invalide' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return res.status(201).json({
    message: 'Commande créée avec succès',
    order: {
      customer,
      items,
      total,
      status: 'pending',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
