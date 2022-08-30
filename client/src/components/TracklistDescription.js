import React from 'react';

const TracklistDescription = props => {
	const [buttonText, setButtonText] = React.useState(
		'Click to show tracklist description'
	);
	const [showText, setShowText] = React.useState(false);

	const toggleShowText = () => {
		console.log(`toggleShowText`);
		setShowText(!showText);
	};

	React.useEffect(() => {
		setButtonText(
			showText
				? 'Hide tracklist description.'
				: 'Click to show tracklist description...'
		);
	}, [showText]);

	return (
		<div className='tracklist__description'>
			<div
				role='button'
				onClick={() => {
					toggleShowText();
				}}
			>
				<p className='tracklist__show_description'>{buttonText}</p>
			</div>
			<p
				className={`tracklist__description-text ${showText ? 'showText' : ''}`}
			>
				{props.description}
			</p>
		</div>
	);
};

export default TracklistDescription;
