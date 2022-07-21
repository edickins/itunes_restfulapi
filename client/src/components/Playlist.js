import React from 'react';
import styles from '../css/playlist.module.css';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';

export default function Playlist(props) {
	const { name, playlistId } = props.playlist;
	const [tracksAsNumbers, setTracksAsNumbers] = React.useState(
		props.playlist.tracks
	);
	const [tracks, setTracks] = React.useState([]);
	const [playlistEls, setPlaylistEls] = React.useState([]);

	//TODO - Playlist still holds reference to 'tracks' array, but it is unlikely
	// that it will be where tracks are rendered. Review this.
	/* React.useEffect(() => {
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
	}, []); */

	function onPlaylistClick(e) {
		e.preventDefault();
		props.getPlaylistTracks(playlistId);
	}

	return (
		<div className={styles.playlistBtn} onClick={onPlaylistClick}>
			<h3>{name}</h3>
			<pre>{playlistId}</pre>
			<pre>{tracksAsNumbers.length} songs.</pre>
			{/* 			{playlistEls} */}
		</div>
	);
}
