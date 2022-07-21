import React from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{/* <FileUpload /> */}
			<Playlists playlists={playlists} onPlaylistClicked={onPlaylistClicked} />
			<Tracklist />
		</div>
	);

	/* click handlers */
	async function onPlaylistClicked(playlistId) {
		getTracks(playlistId);
		selectPlaylistButton(playlistId);
	}

	/* display functions */
	function selectPlaylistButton(playlistId) {
		/* const playlistButtons = document.querySelectorAll('.playlist');

		const els = Array.from(playlistButtons);
		els.forEach(el => {
			el.classList.remove('selected');
		}); */

		const selectedButton = document.getElementById(`playlist${playlistId}`);
		selectedButton.classList.toggle('selected');
	}

	/* API calls */
	async function getTracks(playlistId) {
		const baseURL = '/api/v1/playlistTracks';
		try {
			let response = await axios.get(`${baseURL}/${playlistId}`);
			if (response.data.success === true) {
				console.log(response.data.data);
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
