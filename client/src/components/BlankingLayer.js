import React from 'react';

export default function BlankingLayer(props) {
	return (
		<div
			className={`blankingLayer ${props.tracklistIsOpen ? 'open' : ''} `}
		></div>
	);
}
