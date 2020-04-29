import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Numbers from './components/numbers';
import PieChart from './components/PieChart';
import HomeTable from './components/hometable';
import TopFive from './components/topfive';
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
			<div id="app" className="bg-gray-100">
				<Header />
				<div className="container container-wrapper mt-4">
					<div className="content-box-md">
						<div className="row">
							<div className="col-md-8">
								<Numbers />
							</div>
							<div className="col-md-4">
								<PieChart />
							</div>
						</div>
					</div>
					<div className="content-box-md">
						<div className="row">
							<div className="col-md-8">
								<HomeTable />
							</div>
							<div className="col-md-4">
								<TopFive />
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	};
}

export default App;
