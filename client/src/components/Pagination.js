import React from 'react';

const Pagination = props => {
	const { currentPage, totalPages, changePage } = props;

	let middlePagination;
	if (totalPages <= 5) {
		middlePagination = [...Array(totalPages)].map((_, index) => (
			<button
				key={index + 1}
				onClick={() => {
					changePage(index + 1);
				}}
				className={`${index + 1 === currentPage ? 'currentPage' : ''}`}
				disabled={index + 1 === currentPage}
			>
				{index + 1}
			</button>
		));
	} else {
		const startValue = Math.floor((currentPage - 1) / 5) * 5;

		middlePagination = (
			<>
				{[...Array(5)].map((_, index) => (
					<button
						key={startValue + index + 1}
						disabled={startValue + index + 1 === currentPage}
						className={`${index + 1 === currentPage ? 'currentPage' : ''}`}
						onClick={() => {
							changePage(startValue + index + 1);
						}}
					>
						{startValue + index + 1}
					</button>
				))}
			</>
		);
	}

	return (
		totalPages > 1 && (
			<div className='pagination'>
				<button
					className='pagination__previous'
					onClick={() => {
						changePage(currentPage - 1);
					}}
					disabled={currentPage === 1}
				>
					&#171;
				</button>
				{middlePagination}
				<button
					className='pagination__next'
					onClick={() => {
						changePage(currentPage + 1);
					}}
					disabled={currentPage === totalPages}
				>
					&#187;
				</button>
			</div>
		)
	);
};

export default Pagination;
