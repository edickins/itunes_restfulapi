export const htmlDecode = input => {
	if (!input || input === '') input = 'unknown';
	if (!input || input === null) input = '';
	let e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
};

export const filterPlaylists = playlist => {
	switch (playlist.name.toLowerCase()) {
		case 'library':
		case 'music':
		case 'downloaded':
		case 'podcasts':
		case '90’s music':
		case '0 plays playlist':
			return false;
		default:
			return true;
	}
};

export const isAutoPlaylist = (playlist, isAllowed) => {
	switch (playlist.name.toLowerCase()) {
		case '0 plays playlist':
		case 'my top rated':
		case 'recently added':
		case 'recently played':
		case 'top 25 most played':
		case 'favourites mix':
		case 'get up! mix':
		case 'new music mix':
			return isAllowed;
		default:
			return !isAllowed;
	}
};

export const isApplePlaylist = (playlist, isAllowed) => {
	switch (playlist.name.toLowerCase()) {
		case 'classical music':
		case 'bass, breaks &amp; bleeps':
		case 'best of glitch':
		case 'best of tresor records':
		case 'carpenter brut essentials':
		case 'cocteau twins: next steps':
		case 'concrete riddims':
		case 'electro-funk essentials':
		case 'electronic daily':
		case 'i miss uk garage':
		case 'loops':
		case 'nitzer ebb: influences':
		case 'philip glass essentials':
		case 'popol vuh essentials':
		case 'serenity':
		case 'signal to noise':
		case 'techno essentials':
		case 'tresor':
			return isAllowed;
		default:
			return !isAllowed;
	}
};

export const isMyPlaylist = (playlist, isAllowed) => {
	return (
		isApplePlaylist(playlist, isAllowed) && isAutoPlaylist(playlist, isAllowed)
	);
};
