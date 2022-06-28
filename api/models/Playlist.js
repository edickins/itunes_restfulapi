const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
	tracks: {
		type: [String],
	},
	name: {
		type: String,
		required: [true, 'Playlist must have a name'],
		trim: true,
	},
	slug: String,
	description: {
		type: String,
		required: false,
	},
	playlistId: {
		type: String,
		required: [true, 'Playlist must have an ID'],
		trim: true,
	},
	playlistPersistantId: {
		type: String,
		required: false,
		trim: true,
	},
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
