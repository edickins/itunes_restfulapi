import React from 'react';

import FileUpload from './components/FileUpload';
import About from './components/About';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import BlankingLayer from './components/BlankingLayer';
import LoadingLayer from './components/LoadingLayer';
import useGetPlaylists from './hooks/useGetPlaylists';
import { isAutoPlaylist, isApplePlaylist, isMyPlaylist } from './utils/utils';
import './css/styles.css';

const App = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const { playlists } = useGetPlaylists(setIsLoading);
	const [selectedPlaylistId, setSelectedPlaylistId] = React.useState(null);
	const [tracklistIsOpen, setTracklistIsOpen] = React.useState(false);

	/* respond to data loading or completing loading */
	React.useEffect(() => {
		enableAppScrolling(isLoading || tracklistIsOpen);
	}, [isLoading, tracklistIsOpen]);

	function filterPlaylists(fn, isAllowed) {
		return playlists.filter(playlist => {
			return fn(playlist, isAllowed);
		});
	}

	/* render */
	return (
		<main>
			<h1 className='main__title'>iTunes library</h1>
			<About />
			{/* {<FileUpload />} */}
			{
				<div>
					<Playlists
						playlists={filterPlaylists(isAutoPlaylist, true)}
						onPlaylistClicked={onPlaylistClicked}
						title='Auto-generated Playlists'
					/>
					<Playlists
						playlists={filterPlaylists(isMyPlaylist, false)}
						onPlaylistClicked={onPlaylistClicked}
						title='My Playlists'
					/>
					<Playlists
						playlists={filterPlaylists(isApplePlaylist, true)}
						onPlaylistClicked={onPlaylistClicked}
						title='Apple Curated Playlists'
					/>
				</div>
			}
			{
				<div>
					<BlankingLayer tracklistIsOpen={tracklistIsOpen} />
					<Tracklist
						tracklistIsOpen={tracklistIsOpen}
						selectedPlaylistId={selectedPlaylistId}
						onCloseTracklistClicked={onCloseTracklistClicked}
						setIsLoading={setIsLoading}
					/>
					<LoadingLayer isLoading={isLoading} />
				</div>
			}
		</main>
	);

	/* click handlers */
	async function onPlaylistClicked(playlistId) {
		setSelectedPlaylistId(playlistId);
		setTracklistIsOpen(true);
	}

	function onCloseTracklistClicked() {
		setTracklistIsOpen(false);
		setSelectedPlaylistId(null);
	}

	/* page scroll management */
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
};

export default App;
