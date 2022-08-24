const Playlist = require('../models/Playlist');
const Track = require('../models/Track');

// @desc GET all tracks from a single playlist
// @route GET /api/v1/playlists/:id
// @token public
exports.getPlaylistTracks = async (req, res) => {
	/* 	const dbPlaylist = await Playlist.find({
		playlistId: req.params.id,
	}); */

	try {
		let query = Playlist.find({ playlistId: req.params.id });

		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * pageSize;

		const dbPlaylist = await query;

		const total = dbPlaylist[0].tracks.length;
		const pages = Math.ceil(total / pageSize);
		const endPoint = Math.min(skip + pageSize, total);
		const tracks = dbPlaylist[0].tracks.slice(skip, endPoint);

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
				count: tracks.length,
				page,
				pages,
				total,
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
