const Playlist = require('../models/Playlist');
const Track = require('../models/Track');

// @desc GET a single playlist
// @route GET /api/v1/playlists/:id
// @token public
exports.getPlaylistTracks = async (req, res) => {
	const dbPlaylist = await Playlist.find({
		playlistId: req.params.id,
	});

	const tracks = dbPlaylist[0].tracks;

	const trackDetailPromises = tracks.map(track => {
		return findTrackDetails(track);
	});

	Promise.all(trackDetailPromises).then(results => {
		const tracks = results.map(trackArray => {
			return trackArray[0];
		});
		res.status(200).json({
			success: true,
			msg: `get playlist with id ${req.params.id}`,
			data: tracks,
		});
	});
};

function findTrackDetails(track) {
	return Track.find({
		trackId: track,
	});
}
