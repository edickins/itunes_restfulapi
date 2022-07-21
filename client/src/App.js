import React from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = React.useState('');
	const [selectedPlaylist, setSelectedPlaylist] = React.useState({});
	const [selectedTracklist, setSelectedTracklist] = React.useState([]);
	const [tracklistOpen, setTracklistOpen] = React.useState(false);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	React.useEffect(() => {
		if (playlists.length === 0) return;
		getTracks(selectedPlaylistId);
		setSelectedPlaylist(
			playlists.find(playlist => {
				return playlist.playlistId === selectedPlaylistId;
			})
		);
		setTracklistOpen(true);
	}, [selectedPlaylistId]);

	/* render */
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{/* <FileUpload /> */}
			<Playlists playlists={playlists} onPlaylistClicked={onPlaylistClicked} />
			<Tracklist
				name={selectedPlaylist.name ? selectedPlaylist.name : ''}
				description={
					selectedPlaylist.description ? selectedPlaylist.description : ''
				}
				tracks={selectedTracklist}
				tracklistOpen={tracklistOpen}
				onCloseTracklistClicked={onCloseTracklistClicked}
			/>
		</div>
	);

	/* click handlers */
	async function onPlaylistClicked(playlistId) {
		setSelectedPlaylistId(playlistId);
	}

	function onCloseTracklistClicked() {
		setTracklistOpen(false);
	}

	/* API calls */
	async function getTracks() {
		if (selectedPlaylistId === '') return;
		const baseURL = '/api/v1/playlistTracks';
		try {
			let response = await axios.get(`${baseURL}/${selectedPlaylistId}`);
			if (response.data.success === true) {
				setSelectedTracklist(response.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function getPlaylists() {
		const baseURL = '/api/v1/playlists';
		try {
			let response = await axios.get(baseURL);
			if (response.data.success === true) {
				setPlaylists(response.data.data);
			}
		} catch (err) {
			console.log(err);
		}
	}
};

export default App;
