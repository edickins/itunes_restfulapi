import React from 'react';
import Playlist from './Playlist';
import { nanoid } from 'nanoid';

export default function Playlists(props) {
	const playlists = props.playlists;
	const [playlistsEls, setPlaylistsEls] = React.useState([]);

	/* create Playlist Elements when playlists value is updated */
	React.useEffect(() => {
		if (playlists.length === 0) return;
		setPlaylistsEls(
			playlists.map(playlist => {
				if (playlist.tracks.length > 0) {
					return (
						<Playlist
							playlist={playlist}
							key={nanoid()}
							onPlaylistClicked={props.onPlaylistClicked}
						/>
					);
				} else {
					return null;
				}
			})
		);
	}, [playlists, props.onPlaylistClicked]);

	return <div className='playlistsContainer'>{playlistsEls}</div>;
}
