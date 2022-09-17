import React from 'react';
import { htmlDecode } from '../utils/utils';
import TracklistDescription from './TracklistDescription';

export default function PlaylistButton(props) {
	const { name, playlistId, description } = props.playlist;
	const colours = ['#736002', '#f0a967', '#e87f54', '#df5441'];
	const styles = {
		background: `linear-gradient(to bottom, ${getRandomColour()}, ${getRandomColour()})`,
	};

	/* event handlers */
	function onPlaylistClick(e) {
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
			className={`playlists__btn`}
			style={styles}
			onClick={onPlaylistClick}
		>
			<h3 className='playlist__name'>{htmlDecode(name)}</h3>
			<p className='playlist__info'>{props.playlist.tracks.length} songs.</p>
			<TracklistDescription
				description={htmlDecode(description)}
			></TracklistDescription>
		</div>
	);
}
