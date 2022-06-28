import FileUpload from './components/FileUpload';
import Playlists from './components/Playlists';
import './css/styles.css';

const App = () => {
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mb-4'>iTunes library</h4>
			{/* <FileUpload /> */}
			<Playlists />
		</div>
	);
};

export default App;
