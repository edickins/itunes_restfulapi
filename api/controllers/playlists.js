const Playlist = require('../models/Playlist');
const Tracks = require('../models/Track');

// @desc GET all playlists
// @route GET /api/v1/playlists
// @token public
exports.getPlaylists = async (req, res, next) => {
	const dbPlaylists = await Playlist.find();

	/* const miniPlaylists = [];
  miniPlaylists.push(dbPlaylists[20]);


  Promise.all(
    miniPlaylists.map(playlist => {
      return Promise.all(
        playlist.tracks.map(trackId => {
          return Tracks.find({ trackId: trackId });
        })
      );
    })
  ).then(function (data) {
    miniPlaylists.forEach((playlist, index) => {
      playlist.tracks = data[index];
      // console.log(`tracklist data ${data[index]}`);
      console.log(`playlist.tracks ${playlist.tracks}`);
    }); */

	res
		.status(200)
		.json({ success: true, msg: `get playlists`, data: dbPlaylists });
};

// @desc GET a single playlist
// @route GET /api/v1/playlists/:id
// @token public
exports.getPlaylist = (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: `get playlist with id ${req.params.id}` });
};

// @desc POST a single playlist
// @route POST /api/v1/playlists
// @token private
exports.createPlaylist = async (req, res) => {
	const playlist = await Playlist.create(req.body);

	res
		.status(201)
		.json({ sucess: true, msg: `added a playlist`, data: playlist });
};
