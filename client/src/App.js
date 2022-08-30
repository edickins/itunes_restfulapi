import React from 'react';
import axios from 'axios';
import { filterPlaylists } from './utils/utils';
import FileUpload from './components/FileUpload';
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
			<p>These are the playlists in my iTunes library.</p>
			<p>
				Once a week I upload an .xml export of my iTunes library to my server,
				and the contents are stored in a database.
			</p>
			<p>
				I used{' '}
				<a href='http://expressjs.com/' target='_blank'>
					express
				</a>{' '}
				to build a RESTful API which serves this data via endpoints. The
				frontend was built in{' '}
				<a href='https://reactjs.org/' target='_blank'>
					reactjs
				</a>
				.
			</p>
			<p>
				If you are interested, the code for both the frontend and backend are in
				this repository{' '}
				<a href='https://github.com/edickins/itunes_restfulapi' target='_blank'>
					itunes_restfulAPI
				</a>
				.
			</p>
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
							if (playlist.description.length > 350) {
								playlist.description = playlist.description.slice(0, 350);
								playlist.description += ' [...]';
							}
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
