import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import Tracklist from './components/Tracklist';
import './css/styles.css';

const App = () => {
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{/* <FileUpload /> */}
			<Playlists />
			<Tracklist />
		</div>
	);
};

export default App;
