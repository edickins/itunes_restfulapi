import React from 'react';
import { htmlDecode } from '../utils/utils';
import TracklistDescription from './TracklistDescription';

export default function PlaylistButton(props) {
	const { name, playlistId, description } = props.playlist;
	/* const colours = [
		'#58508d',
		'#8a508f',
		'#bc5090',
		'#de5a79',
		'#ff6361',
		'#ff8531',
	]; */

	const colours = ['#939ca3', '#646f77', '#b5bdc4', '#aeb4ac'];
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
