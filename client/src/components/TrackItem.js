import React from 'react';
import { htmlDecode } from '../utils/utils';

export default function TrackItem(props) {
	const { track } = props;
	if (track === null) return;
	return (
		<div>
			<p className='trackDetails'>
				<span className='artistName'>{htmlDecode(track.artist)}</span> -{' '}
				<span className='trackName'>{htmlDecode(track.name)}</span>{' '}
				<span className='albumName'>{htmlDecode(track.album)}</span>
			</p>
		</div>
	);
}
