import React from 'react';
import axios from 'axios';
import Playlist from './Playlist';
import { nanoid } from 'nanoid';

export default function Playlists() {
	const [playlists, setPlaylists] = React.useState([]);
	const [playlistsEls, setPlaylistsEls] = React.useState([]);

	React.useEffect(() => {
		setPlaylistsEls(
			playlists.map(playlist => {
				if (playlist.tracks.length < 200 && playlist.tracks.length > 0) {
					return <Playlist playlist={playlist} key={nanoid()} />;
				}
			})
		);
	}, [playlists]);

	const baseURL = '/api/v1/playlists';

	React.useEffect(() => {
		axios.get(baseURL).then(response => {
			setPlaylists(response.data.data);
		});
	}, []);

	// setPlaylists(getPlaylists());
	return <div className='playlists--container'>{playlistsEls}</div>;
}
