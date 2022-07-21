import React from 'react';
import styles from '../css/tracklist.module.css';
export default function PlaylistTracks(props) {
	return (
		<div className={`${styles.tracklistContainer}`}>
			<h1 className={styles.playlistTitle}>tracks</h1>
		</div>
	);
}
