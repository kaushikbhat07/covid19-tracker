import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Home from './HomePage';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class Main extends Component {
	render() {
		return (
			<div>
				<Header />
				<Switch location={this.props.location}>
					<Route path='/home' component={Home} />
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(Main);