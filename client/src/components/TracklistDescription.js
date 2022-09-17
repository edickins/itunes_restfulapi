import React from 'react';
import { htmlDecode } from '../utils/utils';
import Toggle from './Toggle';

const TracklistDescription = props => {
	return (
		<Toggle
			render={({ on, toggle }) => {
				return (
					props.description !== 'unknown' && (
						<div className={`tracklist__description ${on ? 'showText' : ''}`}>
							<div
								role='button'
								onClick={event => {
									toggle(event);
								}}
							>
								<p className='tracklist__show_description'>
									{on
										? htmlDecode('close &#10006;')
										: htmlDecode('show description')}
								</p>
								<p className={`tracklist__description-text `}>
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
