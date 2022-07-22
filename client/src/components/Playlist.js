import React from 'react';
// import styles from '../css/playlist.module.css';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';

export default function Playlist(props) {
	const { name, playlistId, description } = props.playlist;

	const colours = ['colour1', 'colour2', 'colour3', 'colour4'];

	const [playlistLength, setPlaylistLength] = React.useState(0);

	/* event handlers */
	function onPlaylistClick(e) {
		e.preventDefault();
		props.onPlaylistClicked(playlistId);
	}

	/* display functions */
	function getRandomColour() {
		const rand = Math.floor(Math.random() * colours.length);
		return colours[rand];
	}

	return (
		<div
			id={`playlist${playlistId}`}
			className={`playlist playlistBtn ${getRandomColour()}`}
			onClick={onPlaylistClick}
		>
			<h3 className='playlistName'>{name}</h3>
			<p className='playlistDescription'>{description}</p>
			<hr />
			<p className='playlistInfo'>{props.playlist.tracks.length} songs.</p>
		</div>
	);
}
