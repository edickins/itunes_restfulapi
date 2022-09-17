import React from 'react';
import axios from 'axios';
import { filterPlaylists } from './utils/utils';
import FileUpload from './components/FileUpload';
import About from './components/About';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import BlankingLayer from './components/BlankingLayer';
import LoadingLayer from './components/LoadingLayer';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);
	const [selectedPlaylistId, setSelectedPlaylistId] = React.useState(null);
	const [tracklistIsOpen, setTracklistIsOpen] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	/* respond to selectedPlaylistId being set after user clicks on a playlist */
	React.useEffect(() => {
		if (selectedPlaylistId === null) return;
		// setIsLoading(true);
		setTracklistIsOpen(true);
	}, [selectedPlaylistId]);

	/* respond to data loading or completing loading */
	React.useEffect(() => {
		enableAppScrolling(isLoading || tracklistIsOpen);
	}, [isLoading, tracklistIsOpen]);

	/* render */
	return (
		<main>
			<h1 className='main__title'>iTunes library</h1>

			<About />
			{/* {<FileUpload />} */}
			{playlists.length > 0 && (
				<>
					<Playlists
						playlists={playlists}
						onPlaylistClicked={onPlaylistClicked}
					/>
					<BlankingLayer tracklistIsOpen={tracklistIsOpen} />
					<Tracklist
						tracklistIsOpen={tracklistIsOpen}
						selectedPlaylistId={selectedPlaylistId}
						onCloseTracklistClicked={onCloseTracklistClicked}
						setIsLoading={setIsLoading}
					/>
					<LoadingLayer isLoading={isLoading} />
				</>
			)}
		</main>
	);

	/* click handlers */
	async function onPlaylistClicked(playlistId) {
		setSelectedPlaylistId(playlistId);
	}

	function onCloseTracklistClicked() {
		setTracklistIsOpen(false);
		setSelectedPlaylistId(null);
	}

	function enableAppScrolling(allow) {
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
		const baseURL = 'https://cdn.bleepbloop.net/itunes/api/v1/playlists';
		setIsLoading(true);
		try {
			let response = await axios.get(baseURL);
			if (response.data.success === true) {
				if (response.data.data.length > 0) {
					const playlists = response.data.data;
					const filteredPlaylists = playlists.filter(playlist => {
						return filterPlaylists(playlist);
					});

					const descriptionLimitedPlaylists = filteredPlaylists.map(
						playlist => {
							/* if (playlist.description.length > 350) {
								playlist.description = playlist.description.slice(0, 350);
								playlist.description += ' [...]';
							} */
							return playlist;
						}
					);

					setPlaylists(descriptionLimitedPlaylists);
					setIsLoading(false);
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
};

export default App;
