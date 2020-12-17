import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Import Materialize
import M from 'materialize-css';

import LogIn from '../LogIn/LogIn';

import Register from '../Register/Register';
import MainPage from '../MainPage/MainPage';
import Footer from '../Footer/Footer';

class CorePage extends Component {
	componentDidMount() {
		// Auto initialize all the things!
		M.AutoInit();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact component={LogIn} />
						<Route path="/Register" component={Register} />
						<Route path="/MainPage/Home" component={MainPage} />
						<Route path="/MainPage" component={MainPage} />
					</Switch>
				</BrowserRouter>
				<Footer />
			</div>
		);
	}
}

export default CorePage;
