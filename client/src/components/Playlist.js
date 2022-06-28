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
		// console.log(`tracks.useEffect tracks: ${tracks[0].data.data[0].name}`);
		setPlaylistEls(
			tracks.map(track => {
				if (track.data && track.data.data && track.data.data.length > 0) {
					return <TrackItem data={track.data.data[0]} key={nanoid()} />;
				} else {
					return <TrackItem data={[]} key={nanoid()} />;
				}
			})
		);
	}, [tracks]);

	return (
		<div className={styles.playlistContainer}>
			<h3>{name}</h3>
			<pre>{playlistId}</pre>
			<pre>{tracksAsNumbers.length} songs.</pre>
			{playlistEls}
		</div>
	);
}
