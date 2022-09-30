import React from 'react';
import PlaylistButton from './PlaylistButton';
import { nanoid } from 'nanoid';

export default function Playlists(props) {
	const { playlists, title } = props;
	const [playlistsEls, setPlaylistsEls] = React.useState([]);

	/* create Playlist Elements when playlists value is updated */
	React.useEffect(() => {
		if (!playlists || playlists.length === 0) return;
		setPlaylistsEls(
			playlists.map(playlist => {
				if (playlist.tracks.length > 0) {
					return (
						<PlaylistButton
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
	}, [props.onPlaylistClicked, playlists]);

	return (
		<div>
			<p className='playlist__title'>{title}</p>
			<div className='playlists'>{playlistsEls}</div>
		</div>
	);
}
