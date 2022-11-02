import React, { useState, useEffect } from 'react';
import './Pagination.css';

export default function Pagination({
	data,
	RenderComponent,
	pageLimit,
	dataLimit
}) {
	const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
		setPages(Math.ceil(data.length / dataLimit));
	}, [data, dataLimit]);

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: '0px' });
	}, [currentPage]);

	function goToNextPage() {
		setCurrentPage((page) => page + 1);
	}

	function goToPreviousPage() {
		setCurrentPage((page) => page - 1);
	}

	function changePage(event) {
		const pageNumber = Number(event.target.textContent);
		setCurrentPage(pageNumber);
	}

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return data.slice(startIndex, endIndex);
	};

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		let prueba = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);

		return prueba;
	};

	return (
		<div>
			<div className="dataContainer">
				{getPaginatedData().map((d, idx) => (
					<div key={idx} className="Cards">
						<RenderComponent key={idx} data={d} />
					</div>
				))}
			</div>
			<div className="pagination">
				<button
					onClick={goToPreviousPage}
					className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
				>
					<b>prev</b>
				</button>

				{getPaginationGroup().map((number, index) => {
					if (number <= pages) {
						return (
							<button
								key={index}
								onClick={changePage}
								className={`paginationItem ${
									currentPage === number ? 'active' : null
								}`}
							>
								<span>{number}</span>
							</button>
						);
					} else {
						return null;
					}
				})}

				<button
					onClick={goToNextPage}
					className={`next ${currentPage === pages ? 'disabled' : ''}`}
				>
					<b>next</b>
				</button>
			</div>
		</div>
	);
}
