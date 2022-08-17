import React from 'react';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';
export default function PlaylistTracks(props) {
	const { tracks, tracklistOpen } = props;
	const selectedPlaylist = props.selectedPlaylist || {};

	const [tracksEls, setTracksEls] = React.useState([]);

	React.useEffect(() => {
		if (tracks) {
			setTracksEls(
				tracks.map(track => {
					return <TrackItem track={track} key={nanoid()} />;
				})
			);
		}
	}, [tracks]);

	/* button functions */
	function onCloseBtnClicked(e) {
		e.preventDefault();
		props.onCloseTracklistClicked();
	}

	return (
		<div className={`tracklistContainer ${tracklistOpen ? 'open' : ''}`}>
			<button id='closeTracklistBtn' onClick={onCloseBtnClicked}>
				&times;
			</button>
			<div className='playlistInfo'>
				<h1 className='playlistTitle'>{selectedPlaylist.name}</h1>
				<p className='playlistStats'>
					<span className='totalSongs'>{tracks.length}</span>
					<span className='playlistDuration'></span>
				</p>
				<p className='playlistDescription'>{selectedPlaylist.description}</p>
			</div>
			<div className='scrolling'>
				<div className='playlistTracks'>{tracksEls}</div>
			</div>
		</div>
	);
}
