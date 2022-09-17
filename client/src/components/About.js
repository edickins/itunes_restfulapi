import React from 'react';
import Toggle from './Toggle';

const About = () => {
	return (
		<Toggle
			render={({ on, toggle }) => {
				return (
					<section className='about'>
						<a
							onClick={event => {
								toggle(event);
							}}
							role='button'
							href='#'
						>
							<p className='about__link'>about</p>
						</a>
						<div className={`about__text ${on ? 'show' : 'hide'}`}>
							<p>These are the playlists in my iTunes library.</p>
							<p>
								Once a week I upload an .xml export of my iTunes library to my
								server, and the contents are stored in a database.
							</p>
							<p>
								I used{' '}
								<a href='http://expressjs.com/' target='_blank'>
									express
								</a>{' '}
								to build a RESTful API which serves this data via endpoints. The
								frontend was built in{' '}
								<a href='https://reactjs.org/' target='_blank'>
									reactjs
								</a>
								.
							</p>
							<p>
								If you are interested, the code for both the frontend and
								backend are in this repository{' '}
								<a
									href='https://github.com/edickins/itunes_restfulapi'
									target='_blank'
								>
									itunes_restfulAPI
								</a>
								.
							</p>
						</div>
					</section>
				);
			}}
		/>
	);
};

export default About;
