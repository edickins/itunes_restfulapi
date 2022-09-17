import React from 'react';
import Toggle from './Toggle';

const TracklistDescription = props => {
	return (
		<Toggle
			render={({ on, toggle }) => {
				return (
					props.description && (
						<div className='tracklist__description'>
							<div
								role='button'
								onClick={event => {
									toggle(event);
								}}
							>
								<p className='tracklist__show_description'>
									{on ? 'click to close' : 'show description'}
								</p>
								<p
									className={`tracklist__description-text ${
										on ? 'showText' : ''
									}`}
								>
									{props.description}
								</p>
							</div>
						</div>
					)
				);
			}}
		/>
	);
};

export default TracklistDescription;
