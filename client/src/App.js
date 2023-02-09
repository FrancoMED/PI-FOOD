import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home/Home.jsx';
import DetailsRecipe from './components/DetailsRecipe/DetailsRecipe.jsx';
import CreateRecipe from './components/CreateRecipe/CreateRecipe.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'https://pi-food-production-back.up.railway.app/';

function App() {
	return (
		<div className="App">
			<Route path="/" exact component={Landing} />
			<Route path="/recipes" component={NavBar} />
			<Route path="/recipes" exact component={Home} />
			<Route path="/recipes/:id" component={DetailsRecipe} />
			<Route path="/create" component={CreateRecipe} />
		</div>
	);
}

export default App;
