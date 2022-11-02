import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

export default function Card(props) {
	const { id, name, image, diets } = props.data;
	const handleOnError = (e) => {
		e.target.src =
			'https://cdn.pixabay.com/photo/2016/04/23/22/35/healthy-food-1348430__340.jpg';
	};

	return (
		<div key={id} className="cardContainer">
			<NavLink className="NavLink" to={`/recipes/${id}`}>
				<div className="imgContainer">
					<img src={image} onError={handleOnError} alt="NOT FOUND" />
				</div>
				<div className="nameContainer">
					<h3>{name}</h3>
				</div>
				<div className="dietsContainer">
					<h6>{diets}</h6>
				</div>
			</NavLink>
		</div>
	);
}
