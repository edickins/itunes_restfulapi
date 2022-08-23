import React from 'react';

export default function TrackItem(props) {
	const { track } = props;
	if (track === null) return;
	return (
		<div>
			<p className='trackTitle'>{track.name}</p>
		</div>
	);
}
