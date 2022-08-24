import React from 'react';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';
import axios from 'axios';
export default function PlaylistTracks(props) {
	const [tracks, setTracks] = React.useState([]);
	const [tracksEls, setTracksEls] = React.useState([]);
	const [selectedPlaylistName, setSelectedPlaylistName] = React.useState('');
	const [selectedPlaylistDescription, setSelectedPlaylistDescription] =
		React.useState('');
	const [totalPlaylistTracks, setTotalPlaylistTracks] = React.useState(0);

	const { selectedPlaylistId, tracklistOpen, setIsLoading } = props;

	React.useEffect(() => {
		async function getAllTracks() {
			if (selectedPlaylistId === null) return;
			setIsLoading(true);
			const baseURL = '/api/v1/playlistTracks';
			try {
				let response = await axios.get(`${baseURL}/${selectedPlaylistId}`);
				if (response.data.success === true) {
					setIsLoading(false);
					setTracks(response.data.data);
					setSelectedPlaylistName(response.data.playlistName);
					setSelectedPlaylistDescription(response.data.playlistDescription);
					setTotalPlaylistTracks(response.data.totalTracks);
				}
			} catch (err) {
				console.log(err);
			}
		}
		getAllTracks(selectedPlaylistId);
	}, [selectedPlaylistId, setIsLoading]);

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
				<h1 className='playlistTitle'>{selectedPlaylistName}</h1>
				<p className='playlistStats'>
					<span className='totalSongs'>{totalPlaylistTracks}</span>
					<span className='playlistDuration'></span>
				</p>
				<p className='playlistDescription'>{selectedPlaylistDescription}</p>
			</div>
			<div className='scrolling'>
				<div className='playlistTracks'>{tracksEls}</div>
			</div>
		</div>
	);
}
