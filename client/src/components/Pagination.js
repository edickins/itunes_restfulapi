/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Pagination = props => {
	const { currentPage, totalPages, changePage } = props;

	let middlePagination;
	if (totalPages <= 5) {
		middlePagination = [...Array(totalPages)].map((_, index) => (
			<a
				href='javascript:void(0)'
				key={index + 1}
				onClick={() => {
					changePage(index + 1);
				}}
				className={`btn pagination__btn ${
					index + 1 === currentPage ? 'currentPage disabled' : ''
				}`}
				disabled={index + 1 === currentPage}
			>
				<p>{index + 1}</p>
			</a>
		));
	} else {
		const startValue = Math.floor((currentPage - 1) / 5) * 5;

		console.log(`startValue ${startValue}`);

		const buttonsRequired =
			startValue + 5 < totalPages ? 5 : totalPages - startValue;

		middlePagination = (
			<>
				{[...Array(buttonsRequired)].map((_, index) => (
					<a
						href='javascript:void(0)'
						key={startValue + index + 1}
						disabled={startValue + index + 1 === currentPage}
						className={`btn pagination__btn ${
							index + 1 + startValue === currentPage
								? 'currentPage disabled'
								: ''
						}`}
						onClick={() => {
							changePage(startValue + index + 1);
						}}
					>
						{startValue + index + 1}
					</a>
				))}
			</>
		);
	}

	const prevPage = () => {
		changePage(currentPage - 1);
	};

	const nextPage = () => {
		changePage(currentPage + 1);
	};

	return (
		totalPages > 1 && (
			<>
				<div className='pagination'>
					<a
						href='javascript:void(0)'
						className={`btn pagination__btn ${currentPage === 1 && 'disabled'}`}
						onClick={currentPage > 1 ? prevPage : null}
					>
						&#171;
					</a>
					{middlePagination}
					<a
						href='javascript:void(0)'
						className={`btn pagination__btn ${
							currentPage === totalPages && 'disabled'
						}`}
						onClick={currentPage < totalPages ? nextPage : null}
					>
						&#187;
					</a>
				</div>
				<p className='pagination__pagecount'>
					Page {currentPage} of {totalPages}
				</p>
			</>
		)
	);
};

export default Pagination;
