import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';
import TopFiveBarChart from './TopFiveBarChart';

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
			},
			topfive: {
				isLoaded: false,
				error: null
			},
			topfivebarchart: {
				isLoaded: false,
				error: null
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
					if (result['Countries'] !== undefined) {
						var topfiveSortedArr = [];
						topfiveSortedArr = result['Countries'].slice();
						topfiveSortedArr.sort(
							function (a, b) {
								return b['TotalConfirmed'] - a['TotalConfirmed'];
							}
						);
						var indiaArr = [];
						result['Countries'].filter((param) => {
							if (param['Slug'] === "india") {
								indiaArr = param;
							}
							return 1;
						})
					}
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
						},
						topfive: {
							data: {
								labels: [topfiveSortedArr[0]['Country'], topfiveSortedArr[1]['Country'], topfiveSortedArr[2]['Country'], topfiveSortedArr[3]['Country'], topfiveSortedArr[4]['Country']],
								datasets: [{
									label: "Top 5 nations confirmed cases",
									backgroundColor: ['#662e9b', '#43bccd', '#538d22', '#ff5400', '#f9c80e'],
									hoverBackgroundColor: ['#4D2082', '#2F8A99', '#1a4301', '#DC4300', '#BD8C0A'],
									borderColor: '#fff',
									data: [topfiveSortedArr[0]['TotalConfirmed'], topfiveSortedArr[1]['TotalConfirmed'], topfiveSortedArr[2]['TotalConfirmed'], topfiveSortedArr[3]['TotalConfirmed'], topfiveSortedArr[4]['TotalConfirmed']]
								}]
							},
							isLoaded: true
						},
						topfivebarchart: {
							data: {
								labels: [topfiveSortedArr[0]['CountryCode'], topfiveSortedArr[1]['Country'], topfiveSortedArr[2]['CountryCode'], topfiveSortedArr[3]['Country'], topfiveSortedArr[4]['Country']],
								datasets: [{
									label: ['Confirmed cases'],
									backgroundColor: ['#1d3557', '#1d3557', '#1d3557', '#1d3557', '#1d3557'],
									hoverBackgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff',],
									borderColor: '#000',
									data: [topfiveSortedArr[0]['TotalConfirmed'], topfiveSortedArr[1]['TotalConfirmed'], topfiveSortedArr[2]['TotalConfirmed'], topfiveSortedArr[3]['TotalConfirmed'], topfiveSortedArr[4]['TotalConfirmed']]
								},
								{
									label: ['Death cases'],
									backgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									hoverBackgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									borderColor: '#000',
									data: [topfiveSortedArr[0]['TotalDeaths'], topfiveSortedArr[1]['TotalDeaths'], topfiveSortedArr[2]['TotalDeaths'], topfiveSortedArr[3]['TotalDeaths'], topfiveSortedArr[4]['TotalDeaths']]
								},
								{
									label: ['Recovery Cases'],
									backgroundColor: ['#134611', '#134611', '#134611', '#134611', '#134611'],
									hoverBackgroundColor: ['#28a745', '#28a745', '#28a745', '#28a745', '#28a745'],
									borderColor: '#000',
									data: [topfiveSortedArr[0]['TotalRecovered'], topfiveSortedArr[1]['TotalRecovered'], topfiveSortedArr[2]['TotalRecovered'], topfiveSortedArr[3]['TotalRecovered'], topfiveSortedArr[4]['TotalRecovered']]
								}								
								]
							},
							isLoaded: true
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
							items: ["-", "-", "-", "-"],
							isLoaded: false,
							error: error
						},
						topfive: {
							isLoaded: false,
							error: error
						},
						topfivebarchart: {
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
							<TopFive isLoaded={this.state.topfive.isLoaded} error={this.state.topfive.error} data={this.state.topfive.data} />

							<TopFiveBarChart isLoaded={this.state.topfivebarchart.isLoaded} error={this.state.topfivebarchart.error} data={this.state.topfivebarchart.data} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;