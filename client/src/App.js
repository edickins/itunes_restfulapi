import React from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import BlankingLayer from './components/BlankingLayer';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = React.useState(null);
	const [selectedPlaylist, setSelectedPlaylist] = React.useState({});
	const [selectedTracklist, setSelectedTracklist] = React.useState([]);
	const [tracklistOpen, setTracklistOpen] = React.useState(false);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	/* respond to selectedPlaylistId being set after user clicks on a playlist */
	React.useEffect(() => {
		async function getAllTracks() {
			if (selectedPlaylistId === null) return;
			const baseURL = '/api/v1/playlistTracks';
			try {
				let response = await axios.get(`${baseURL}/${selectedPlaylistId}`);
				if (response.data.success === true) {
					setSelectedTracklist(response.data.data);
					setSelectedPlaylist(
						playlists.find(playlist => {
							return playlist.playlistId === selectedPlaylistId;
						})
					);
					setTracklistOpen(true);
					enableAppScrolling(false);
				}
			} catch (err) {
				console.log(err);
			}
		}

		getAllTracks(selectedPlaylistId);
	}, [selectedPlaylistId, playlists]);

	/* render */
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{<FileUpload />}
			{playlists.length > 0 && (
				<>
					<Playlists
						playlists={playlists}
						onPlaylistClicked={onPlaylistClicked}
					/>
					<BlankingLayer tracklistOpen={tracklistOpen} />
					<Tracklist
						selectedPlaylist={selectedPlaylist}
						tracks={selectedTracklist}
						tracklistOpen={tracklistOpen}
						onCloseTracklistClicked={onCloseTracklistClicked}
					/>
				</>
			)}
		</div>
	);

	/* click handlers */
	async function onPlaylistClicked(playlistId) {
		setSelectedPlaylistId(playlistId);
	}

	function onCloseTracklistClicked() {
		setTracklistOpen(false);
		setSelectedPlaylistId(null);
		enableAppScrolling(true);
	}

	function enableAppScrolling(allow) {
		document.body.classList.toggle('blankingLayerOpen');
	}

	/* API calls */

	async function getPlaylists() {
		const baseURL = '/api/v1/playlists';
		try {
			let response = await axios.get(baseURL);
			if (response.data.success === true) {
				if (response.data.data.length > 0) {
					const trimmedPlaylists = response.data.data.map(playlist => {
						if (playlist.description.length > 350) {
							playlist.description = playlist.description.slice(0, 350);
							playlist.description += ' [...]';
						}
						return playlist;
					});
					setPlaylists(trimmedPlaylists);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};

export default App;
