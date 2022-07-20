import React from 'react';
import styles from '../css/tracklist.module.css';
export default function PlaylistTracks(props) {
	return (
		<div className={`${styles.tracklistContainer} ${styles.open}`}>
			<h1 className={styles.playlistTitle}>tracks</h1>
		</div>
	);
}
