import React from 'react';

export default function TrackItem(props) {
	return (
		<div>
			<p>
				{props.data.name}
				<span> {props.data.trackId}</span>
			</p>
		</div>
	);
}
