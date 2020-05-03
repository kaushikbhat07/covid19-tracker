import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Home from './HomePage';
import IndiaPage from './india/IndiaPage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class Main extends Component {

	render() {
		return (
			<div>
				<div id="loader">
					<div id="loader-icon">
						<img src="assets/images/loader.gif" alt="Loading..."/>
					</div>
				</div>
				<div id="content-loaded">
					<Header />
					<Switch location={this.props.location}>
						<Route path='/dashboard' component={Home} />
						<Route exact path='/india' component={IndiaPage} />
						<Redirect to="/dashboard" />
					</Switch>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withRouter(Main);