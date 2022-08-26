export function htmlDecode(input) {
	if (!input || input === null) input = '';
	let e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
}
