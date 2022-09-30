import axios from 'axios';
import { filterPlaylists } from '../utils/utils';
import { useState, useEffect } from 'react';

const useGetPlaylists = setIsLoading => {
	const [playlists, setPlaylists] = useState([]);
	const [error, setError] = useState();

	async function getPlaylists() {
		setIsLoading(true);
		const baseURL = 'https://cdn.bleepbloop.net/itunes/api/v1/playlists';
		try {
			let response = await axios.get(baseURL);
			if (response.data.success === true) {
				if (response.data.data.length > 0) {
					const filteredPlaylists = response.data.data.filter(playlist =>
						filterPlaylists(playlist)
					);
					setIsLoading(false);
					setPlaylists(filteredPlaylists);
				}
			}
		} catch (err) {
			setError(err);
		}
	}

	useEffect(() => {
		getPlaylists();
	}, []);

	return { playlists, error };
};

export default useGetPlaylists;
