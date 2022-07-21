import React from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import './css/styles.css';

const App = () => {
	const [playlists, setPlaylists] = React.useState([]);

	/* get playlists when App loads */
	React.useEffect(() => {
		getPlaylists();
	}, []);

	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{/* <FileUpload /> */}
			<Playlists playlists={playlists} />
			<Tracklist />
		</div>
	);

	function getPlaylists() {
		const baseURL = '/api/v1/playlists';
		axios.get(baseURL).then(response => {
			setPlaylists(response.data.data);
		});
	}
};

export default App;
