import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card({ id, name, image, diets }) {
	return (
		<>
			<NavLink to={`/details/${id}`}>
				{/* <div> */}
				<h3>{name}</h3>

				<img src={image} alt="imagen" />

				<h5>{diets}</h5>
				{/* </div> */}
			</NavLink>
		</>
	);
}
