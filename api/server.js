const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//LOAD env VARS
dotenv.config({ path: './config/config.env' });

// get routes
const library = require('./routes/library');
const playlists = require('./routes/playlists');
const artists = require('./routes/artists');
const songs = require('./routes/songs');
const albums = require('./routes/albums');

const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

const app = express();

// Parse JSON bodies for this app. Make sure you put
app.use(require('body-parser').urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`itunes library`);
});

// DEV logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/library', library);
app.use('/api/v1/playlists', playlists);
app.use('/api/v1/artists', artists);
app.use('/api/v1/songs', songs);
app.use('/api/v1/albums', albums);

const server = app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
