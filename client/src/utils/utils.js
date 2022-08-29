export const htmlDecode = input => {
	if (!input || input === null) input = '';
	let e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
};

export const filterPlaylists = playlist => {
	switch (playlist.name) {
		case 'Library':
		case 'Music':
		case 'Downloaded':
		case 'Podcasts':
		case '90’s Music':
			return false;
		default:
			return true;
	}
};
