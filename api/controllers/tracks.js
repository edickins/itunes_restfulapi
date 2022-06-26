const Track = require('../models/Track');

// @desc GET all songs
// @route GET /api/v1/songs
// @token public
exports.getTracks = (req, res, next) => {
	res.status(200).json({ success: true, msg: `get all tracks` });
};

// @desc GET a single song
// @route GET /api/v1/songs/:id
// @token public
exports.getTrack = async (req, res, next) => {
	const track = await Track.find({ trackId: req.params.id });

	res.status(200).json({
		success: true,
		msg: `get track with id ${req.params.id}`,
		data: track,
	});
};
