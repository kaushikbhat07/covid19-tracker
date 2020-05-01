import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			worldwide: {
				isLoaded: false,
				items: null,
				error: null
			},
			india: {
				isLoaded: false,
				items: null,
				error: null
			},
			piechart: {
				isLoaded: false,
				error: null
			},
			hometable: {
				isLoaded: false,
				error: null,
				items: ["-", "-", "-", "-"]
			}
		}
	}
	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					var indiaArr = [];
					result['Countries'].filter((param) => {
						if (param['Slug'] === "india") {
							indiaArr = param;
						}
						return 1;
					})
					this.setState({
						worldwide: {
							isLoaded: true,
							items: result['Global']
						},
						india: {
							isLoaded: true,
							items: indiaArr
						},
						piechart: {
							data: {
								labels: ["Confirmed Cases", "Total Deaths", "Total Recovered"],
								datasets: [{
									label: "Global effect from Covid-19",
									backgroundColor: ['#007bff', '#f70c0c', '#28a745'],
									hoverBackgroundColor: ['#1d3557', '#d90429', '#134611'],
									borderColor: '#fff',
									data: [result['Global']['TotalConfirmed'], result['Global']['TotalDeaths'], result['Global']['TotalRecovered']]
								}]
							},
							isLoaded: true,
						},
						hometable: {
							isLoaded: true,
							items: result['Countries']
						}
					});
				},
				error => {
					this.getData();
					this.setState({
						worldwide: {
							isLoaded: false,
							error: error
						},
						india: {
							isLoaded: false,
							error: error
						},
						piechart: {
							isLoaded: false,
							error: error
						},
						hometable: {
							isLoaded: false,
							error: error
						}						
					});
				}
			);
	}

	render() {
		return (
			<div className="container container-wrapper mt-4">
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<Numbers
								worldwideItems={this.state.worldwide.items} worldwideisLoaded={this.state.worldwide.isLoaded} worldwideError={this.state.worldwide.error}
								indiaItems={this.state.india.items} indiaisLoaded={this.state.india.isLoaded} indiaError={this.state.india.error}
							/>
						</div>
						<div className="col-md-4">
							<PieChart data={this.state.piechart.data} isLoaded={this.state.piechart.isLoaded} error={this.state.piechart.error} />
						</div>
					</div>
				</div>
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<HomeTable items={this.state.hometable.items} isLoaded={this.state.hometable.isLoaded} error={this.state.hometable.error} />
						</div>
						<div className="col-md-4">
							<TopFive />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;