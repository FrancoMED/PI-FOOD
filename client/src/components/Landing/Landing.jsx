import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css';

function Landing() {
	return (
		<div className="image">
			<div key="landing">
				{/* <h1>Welcome</h1> */}
				<NavLink className="btnLanding" to="/recipes">
					START
				</NavLink>
			</div>
		</div>
	);
}

export default Landing;
