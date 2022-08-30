import React from 'react';
import ReactLoading from 'react-loading';

const LoadingLayer = props => {
	const { isLoading } = props;

	return (
		<div className={`loading ${isLoading ? 'loading--loading' : ''}`}>
			<ReactLoading type='cylon' color='#fff' />
			<p className='loading__text'>loading...</p>
		</div>
	);
};

export default LoadingLayer;
