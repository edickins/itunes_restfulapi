import React from 'react';
import ReactLoading from 'react-loading';

const LoadingLayer = props => {
	const { isLoading } = props;

	return (
		<div className={`loadingLayer ${isLoading ? 'loading' : ''}`}>
			<ReactLoading type='cylon' color='#fff' />
		</div>
	);
};

export default LoadingLayer;
