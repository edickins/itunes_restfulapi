import React from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import BlankingLayer from './components/BlankingLayer';
import LoadingLayer from './components/LoadingLayer';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = React.useState(null);
	const [selectedPlaylist, setSelectedPlaylist] = React.useState({});
	const [selectedTracklist, setSelectedTracklist] = React.useState([]);
	const [tracklistOpen, setTracklistOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	/* respond to selectedPlaylistId being set after user clicks on a playlist */
	React.useEffect(() => {
		if (selectedPlaylistId === null) return;
		setIsLoading(true);
		setTracklistOpen(true);
	}, [selectedPlaylistId]);

	/* respond to data loading or completing loading */
	React.useEffect(() => {
		enableAppScrolling(isLoading || tracklistOpen);
	}, [isLoading, tracklistOpen]);

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
						tracklistOpen={tracklistOpen}
						selectedPlaylistId={selectedPlaylistId}
						onCloseTracklistClicked={onCloseTracklistClicked}
						setIsLoading={setIsLoading}
					/>
					<LoadingLayer isLoading={isLoading} />
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
	}

	function enableAppScrolling(allow) {
		console.log(`enableScrolling ${allow}`);
		const body = document.body;
		if (allow === true) {
			if (!body.classList.contains('noScrolling')) {
				body.classList.add('noScrolling');
			}
		}

		if (allow === false) {
			if (body.classList.contains('noScrolling')) {
				body.classList.remove('noScrolling');
			}
		}
	}

	/* API calls */

	async function getPlaylists() {
		const baseURL = '/api/v1/playlists';
		setIsLoading(true);
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
					setIsLoading(false);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};

export default App;
