import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Materialize
import M from 'materialize-css';

import Home from '../Home/Home';
import NavBar from './NavBar';
import Profile from '../Profile/Profile';
import Schedule from '../Schedule/Schedule';
import TimeOff from '../TimeOff/TimeOff';
import Board from '../Board/Board';
// import Footer from '../Footer/Footer';

class MainPage extends Component {
	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	render() {
		return (
			<div>
				<NavBar />
				<br />
				<Switch>
					<Route path="/MainPage/Home" component={Home} />
					<Route path="/MainPage/Profile" component={Profile} />
					<Route path="/MainPage/Schedule" component={Schedule} />
					<Route path="/MainPage/TimeOff" component={TimeOff} />
					<Route path="/MainPage/Board" component={Board} />
				</Switch>
				<br />
				{/* <Footer /> */}
			</div>
		);
	}
}

export default MainPage;
