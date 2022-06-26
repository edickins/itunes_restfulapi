import React from 'react';
import styles from '../playlist.module.css';
import axios from 'axios';

export default function Playlist(props) {
	const { name, playlistId } = props.playlist;
	const [tracksAsNumbers, setTracksAsNumbers] = React.useState(
		props.playlist.tracks
	);
	const [tracks, setTracks] = React.useState([]);
	const [playlistEls, setPlaylistEls] = React.useState([]);

	React.useEffect(() => {
		const baseURL = `/api/v1/tracks`;
		const allRequests = tracksAsNumbers.map(trackId => {
			return axios.get(`${baseURL}/${trackId}`);
		});

		axios
			.all(allRequests)
			.then(
				axios.spread((...responses) => {
					setTracks(responses);
				})
			)
			.catch(errors => {
				// react on errors.
			});
	}, [tracksAsNumbers]);

	React.useEffect(() => {
		// console.log(`tracks.useEffect tracks: ${tracks[0].data.data[0].name}`);
		setPlaylistEls(
			tracks.map(track => {
				if (track.data && track.data.data && track.data.data.length > 0) {
					return (
						<div>
							<p>
								`id:{track.data.data[0].trackId} name: {track.data.data[0].name}
								`
							</p>
						</div>
					);
				} else {
					const keys = Object.keys(track.data);
					return (
						<div>
							<p>
								`id:{track.data.id} no track name {track.data.data}`
							</p>
						</div>
					);
				}
			})
		);
	}, [tracks]);

	return (
		<div className={styles.playlistContainer}>
			<p>{name}</p>
			<pre>{playlistId}</pre>
			<pre>{tracks.length} songs.</pre>
			{playlistEls}
		</div>
	);
}
