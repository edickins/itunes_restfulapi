import React from 'react';
import styles from '../playlist.module.css';
import axios from 'axios';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';

export default function Playlist(props) {
	const { name, playlistId } = props.playlist;
	const [tracksAsNumbers, setTracksAsNumbers] = React.useState(
		props.playlist.tracks
	);
	const [tracks, setTracks] = React.useState([]);
	const [playlistEls, setPlaylistEls] = React.useState([]);

	React.useEffect(() => {
		processTracks();
	}, [tracksAsNumbers]);

	React.useEffect(() => {
		// console.log(`tracks.useEffect tracks: ${tracks[0].data.data[0].name}`);
		setPlaylistEls(
			tracks.map(track => {
				if (track.data && track.data.data && track.data.data.length > 0) {
					return <TrackItem data={track.data.data[0]} key={nanoid()} />;
				} else {
					return (
						<div>
							<p>`id:{track.data.id} no track name`</p>
						</div>
					);
				}
			})
		);
	}, [tracks]);

	function processTracks() {
		const baseURL = `/api/v1/tracks`;
		if (tracksAsNumbers.length) {
			axios.get(`${baseURL}/${tracksAsNumbers[0]}`).then(track => {
				console.log(track);
				setTracks(oldTracks => {
					return [...oldTracks, track];
				});
			});
		}
	}

	return (
		<div className={styles.playlistContainer}>
			<p>{name}</p>
			<pre>{playlistId}</pre>
			<pre>{tracksAsNumbers.length} songs.</pre>
			{playlistEls}
		</div>
	);
}
