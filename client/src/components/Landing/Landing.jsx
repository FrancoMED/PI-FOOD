import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css';

function Landing() {
	return (
		<div className="image">
			<div key="landing">
				<NavLink className="btnLanding" to="/recipes">
					WELCOME
				</NavLink>
			</div>
		</div>
	);
}

export default Landing;
