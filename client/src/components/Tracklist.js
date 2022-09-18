import React from 'react';
import TrackItem from './TrackItem';
import Pagination from './Pagination';
import TracklistDescription from './TracklistDescription';
import { nanoid } from 'nanoid';
import axios from 'axios';
export default function Tracklist(props) {
	/*props*/
	const { selectedPlaylistId, tracklistIsOpen, setIsLoading } = props;
	/*useState*/
	const [tracks, setTracks] = React.useState([]);
	const [tracksEls, setTracksEls] = React.useState([]);
	const [selectedTracklistName, setSelectedTracklistName] = React.useState('');
	const [selectedTracklistDescription, setSelectedTracklistDescription] =
		React.useState('');
	const [totalTracklistTracks, setTotalTracklistTracks] = React.useState(0);
	/*pagination props*/
	const LIMIT = 15;
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(0);

	React.useEffect(() => {
		async function getAllTracks() {
			if (selectedPlaylistId === null) return;
			setIsLoading(true);
			const baseURL = 'https://cdn.bleepbloop.net/itunes/api/v1/playlistTracks';
			const queryString = `?page=${currentPage}&limit=${LIMIT}`;
			try {
				let response = await axios.get(
					`${baseURL}/${selectedPlaylistId}${queryString}`
				);
				if (response.data.success === true) {
					setIsLoading(false);
					const tracks = response.data.data;
					setTracks(tracks);
					setTotalPages(response.data.totalPages);
					setSelectedTracklistName(response.data.playlistName);
					setSelectedTracklistDescription(response.data.playlistDescription);
					setTotalTracklistTracks(response.data.totalTracks);
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
		setCurrentPage(1);
		setTracks([]);
		setSelectedTracklistDescription('');
		e.preventDefault();
		props.onCloseTracklistClicked();
	}

	return (
		<div className={`tracklist ${tracklistIsOpen ? 'open' : ''}`}>
			<a
				role='button'
				href=''
				className='btn tracklist__close_btn'
				onClick={onCloseBtnClicked}
			>
				✖
			</a>
			<div className='tracklist__info'>
				<h2 className='tracklist__title'>{selectedTracklistName}</h2>
				<p className='tracklist__stats'>
					<span className='tracklist__total-songs'>
						total songs: {totalTracklistTracks}
					</span>
					<span className='tracklist__duration'></span>
				</p>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				changePage={setCurrentPage}
			/>
			<TracklistDescription description={selectedTracklistDescription} />
			<div className='tracklist__tracks'>{tracksEls}</div>
		</div>
	);
}
