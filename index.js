const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running! Use /items to access the data.');
});

let lostItems = [
  { id: 1, item: 'iPhone 13', location: 'Library', status: 'Lost', contact: 'student@email.com' },
  { id: 2, item: 'Blue Umbrella', location: 'Cafeteria', status: 'Found', contact: 'Guard Office' },
];

app.get('/items', (req, res) => { '... '});
app.post('/items', (req, res) => { '... '});
app.put('/items/:id', (req, res) => {' ...' });
app.delete('/items/:id', (req, res) => { '...'});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Live on ${PORT}`));