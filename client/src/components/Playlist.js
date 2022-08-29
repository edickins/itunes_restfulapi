import React from 'react';
import { htmlDecode } from '../utils/utils';

export default function Playlist(props) {
	const { name, playlistId, description } = props.playlist;
	const colours = ['colour1', 'colour2', 'colour3', 'colour4'];

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
			className={`playlists__btn ${getRandomColour()}`}
			onClick={onPlaylistClick}
		>
			<h3 className='playlist__name'>{htmlDecode(name)}</h3>
			{description && <p className='playlist__description'>{description}</p>}
			{description && <hr />}
			<p className='playlist__info'>{props.playlist.tracks.length} songs.</p>
		</div>
	);
}
