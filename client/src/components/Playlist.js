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
					console.log(responses[0]);
					setTracks(responses);
				})
			)
			.catch(errors => {
				// react on errors.
			});
	}, [tracksAsNumbers]);

	React.useEffect(() => {
		console.log(tracks);
		setPlaylistEls(
			tracks.map(track => {
				return (
					<div>
						<p>poo</p>
					</div>
				);
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
