import React, { Component } from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {

	totaldeaths = () => {
		return fetch('https://api.covid19api.com/countries')
			.then(response => {
				if (response.ok) {
					return response;
				}
			},
				error => {
					var errmess = new Error(error.message);
					throw errmess;
				})
			.then(response => response.json())
			.then(response => alert(response['Global']['NewConfirmed']))
			.catch(error => alert(error.message));
	}
	componentDidMount() {
		// this.totaldeaths();
	}

	render() {
		return (
			<BrowserRouter>
				<div id="app" className="bg-gray-100">
					<Main />
				</div>
			</BrowserRouter>
		);
	};
}

export default App;
