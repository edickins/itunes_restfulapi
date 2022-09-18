import React from 'react';
import { htmlDecode } from '../utils/utils';
import TracklistDescription from './TracklistDescription';

export default function PlaylistButton(props) {
	const { name, playlistId, description } = props.playlist;
	const colours = ['#736002', '#f0a967', '#e87f54', '#df5441'];
	const colourObj = getRandomColours(colours);
	const styles = {
		background: `linear-gradient(to bottom, ${colourObj[0]}, ${colourObj[1]})`,
	};

	/* event handlers */
	function onPlaylistClick(e) {
		props.onPlaylistClicked(playlistId);
	}

	/* display functions */
	function getRandomColours(colours) {
		const tempColours = colours;
		tempColours.sort(() => Math.random() - 0.5);

		return [tempColours[[0]], tempColours[1]];
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
			<TracklistDescription description={htmlDecode(description)} />
			<p className='playlist__click-instruction'>click to see playlist</p>
		</div>
	);
}
