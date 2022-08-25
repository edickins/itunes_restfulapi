import React from 'react';
import TrackItem from './TrackItem';
import { nanoid } from 'nanoid';
import axios from 'axios';
export default function PlaylistTracks(props) {
	/*props*/
	const { selectedPlaylistId, tracklistIsOpen, setIsLoading } = props;
	/*useState*/
	const [tracks, setTracks] = React.useState([]);
	const [tracksEls, setTracksEls] = React.useState([]);
	const [selectedPlaylistName, setSelectedPlaylistName] = React.useState('');
	const [selectedPlaylistDescription, setSelectedPlaylistDescription] =
		React.useState('');
	const [totalPlaylistTracks, setTotalPlaylistTracks] = React.useState(0);
	/*pagination props*/
	const LIMIT = 15;
	const [currentPage, setCurrentPage] = React.useState(1);

	React.useEffect(() => {
		console.log(`Tracklist.js useEffect on selectedPlaylistId change`);
		async function getAllTracks() {
			if (selectedPlaylistId === null) return;
			setIsLoading(true);
			const baseURL = '/api/v1/playlistTracks';
			const queryString = `?page=${currentPage}&limit=${LIMIT}`;
			try {
				let response = await axios.get(
					`${baseURL}/${selectedPlaylistId}${queryString}`
				);
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
	}, [selectedPlaylistId, setIsLoading, currentPage]);

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
		<div className={`tracklistContainer ${tracklistIsOpen ? 'open' : ''}`}>
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
