// get Mongoose Models
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');

// @desc GET all tracks from a single playlist
// @route GET /api/v1/playlists/:id
// @alternate route GET /api/v1/playlists/:id?page=n&limit=n
// where page is the pagination page
// where limit is the max number of results
// @token public
exports.getPlaylistTracks = async (req, res) => {
	try {
		let query = Playlist.find({ playlistId: req.params.id });

		const currentPage = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 15;
		const skip = (currentPage - 1) * pageSize;

		const dbPlaylists = await query;

		const dbPlaylist = dbPlaylists[0];
		const dbTracks = dbPlaylist.tracks;

		const totalTracks = dbTracks.length;
		const totalPages = Math.ceil(totalTracks / pageSize);
		const endPoint = Math.min(skip + pageSize, totalTracks);
		const tracks = dbTracks.slice(skip, endPoint);

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
				playlistName: dbPlaylist.name,
				playlistDescription: dbPlaylist.description,
				playlistId: dbPlaylist.playlistId,
				data: tracks,
				tracksOnPage: tracks.length,
				pageSize,
				currentPage,
				totalPages,
				totalTracks,
			});
		});
	} catch (error) {
		res.status(500).json({
			success: 'error',
			message: 'Server Error.',
		});
	}
};

function findTrackDetails(track) {
	return Track.find({
		trackId: track,
	});
}
