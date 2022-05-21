const express = require('express');
const dotenv = require('dotenv');

//LOAD env VARS
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send(`hello from express`);
});

app.get('/api/v1/library', (req, res) => {
  res.status(200).send(`get iTunes library`);
});

app.post('/api/v1/library', (req, res) => {
  res.status(201).send(`library added`);
});

app.get('/api/v1/playlists', (req, res) => {
  res.status(200).send(`get all playlists`);
});

app.get('/api/v1/playlist/:id', (req, res) => {
  res.status(200).send(`get playlist with id ${req.params.id}`);
});

app.get('/api/v1/artist/:id', (req, res) => {
  res.status(200).send(`get artist with id ${req.params.id}`);
});

app.get('/api/v1/song/:id', (req, res) => {
  res.status(200).send(`get song with id ${req.params.id}`);
});

app.get('/api/v1/album/:id', (req, res) => {
  res.status(200).send(`get album with id ${req.params.id}`);
});

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
