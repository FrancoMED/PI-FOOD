import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import DetailsRecipe from './components/DetailsRecipe.jsx';
import CreateRecipe from './components/CreateRecipe.jsx';
function App() {
	return (
		<div className="App">
			<Route path="/" exact component={Landing} />
			<Route path="/recipes" component={NavBar} />
			<Route path="/recipes" component={Home} />
			<Route path="/details/:id" component={DetailsRecipe} />
			<Route path="/create" component={CreateRecipe} />
		</div>
	);
}

export default App;
