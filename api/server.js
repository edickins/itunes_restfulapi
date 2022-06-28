const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//LOAD env VARS
dotenv.config({ path: './config/config.env' });

// get routes
const upload = require('./routes/upload');
const playlists = require('./routes/playlists');
const playlistTracks = require('./routes/playlistTracks');
const artists = require('./routes/artists');
const tracks = require('./routes/tracks');
const albums = require('./routes/albums');

const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

const app = express();

// Parse JSON bodies for this app. Make sure you put
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`itunes library`);
});

// DEV logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/upload', upload);
app.use('/api/v1/playlists', playlists);
app.use('/api/v1/playlistTracks', playlistTracks);
app.use('/api/v1/artists', artists);
app.use('/api/v1/tracks', tracks);
app.use('/api/v1/albums', albums);

const server = app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
	);
});

// handle unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	//close server and exit process
	server.close(() => process.exit(1));
});
