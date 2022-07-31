import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

export default function Card(props) {
	const { id, name, image, diets } = props.data;
	return (
		<>
			<div key={id} className="post">
				<NavLink to={`/details/${id}`}>
					<h3>{name}</h3>

					<img src={image} alt="imagen" />

					<h5>{diets}</h5>
				</NavLink>
			</div>
		</>
	);
}
