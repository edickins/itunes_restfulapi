import React from 'react';

export default function TrackItem(props) {
	return (
		<div>
			<p className='trackTitle'>{props.data.name}</p>
		</div>
	);
}
