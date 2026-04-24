const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running! Use /items to access the data.');
});

let lostItems = [
  {
    id: 1,
    item: 'iPhone 13',
    location: 'Library',
    status: 'Lost',
    contact: 'student@email.com',
  },
  {
    id: 2,
    item: 'Blue Umbrella',
    location: 'Cafeteria',
    status: 'Found',
    contact: 'Guard Office',
  },
];

app.get('/items', (req, res) => {
  const { search } = req.query;
  if (search) {
    const filtered = lostItems.filter((i) =>
      i.item.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(lostItems);
});

app.post('/items', (req, res) => {
  const { item, location, status, contact } = req.body;
  if (!item || !location || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newItem = {
    id: Date.now(),
    item,
    location,
    status,
    contact: contact || 'N/A',
  };
  lostItems.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lostItems.findIndex((i) => i.id === id);
  if (index !== -1) {
    lostItems[index] = { ...lostItems[index], ...req.body };
    res.json(lostItems[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  lostItems = lostItems.filter((i) => i.id !== id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Live on ${PORT}`));