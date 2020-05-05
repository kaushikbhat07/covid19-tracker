import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';
import TopFiveBarChart from './TopFiveBarChart';
import LineChart from './LineChart';
import ContinentChart from './ContinentChart';
import TestsMillion from './TestsMillion';
import WorldTrend from './WorldTrend';

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
			},
			linechart: {
				isLoaded: false,
				error: null
			},
			testsmillion: {
				isLoaded: false,
				error: null,
			},
			worldHistory: {
				isLoaded: false,
				error: null,
				dates: null,
				confirmed: null,
				data: []
			},
			worldDeathHistory: {
				isLoaded: false,
				error: null,
				data: []
			},
			worldRecoveredHistory: {
				isLoaded: false,
				error: null,
				data: []
			}
		}
	}
	componentDidMount() {
		this.getGlobalData();
		this.getIndianData();
		this.getCountriesData();
		this.getWorldHistory();
	}
	getWorldHistory() {
		fetch("https://corona.lmao.ninja/v2/historical/all")
			.then(res => res.json())
			.then(
				result => {
					var a, dateHistory = [];
					var d = new Date();
					a = Object.keys(result['cases']);

					for (let index = 0; index < a.length; index++) {
						d = new Date(a[index]).toDateString();
						d.split(' ');
						dateHistory.push(d.slice(4, 10));
					}
					if (result['cases'] !== undefined) {
						this.setState({
							worldHistory: {
								isLoaded: true,
								error: null,
								dates: dateHistory[0],
								confirmed: Object.values(result['cases']),
								data: {
									labels: dateHistory,
									datasets: [{
										label: 'Confirmed cases',
										fill: false,
										lineTension: 0.5,
										backgroundColor: '#fff',
										hoverBackgroundColor: '#007bff',
										borderColor: '#007bff',
										data: Object.values(result['cases'])
									},
									{
										label: 'Recovery cases',
										fill: false,
										lineTension: 0.5,
										backgroundColor: '#fff',
										hoverBackgroundColor: '#3e8914',
										borderColor: '#3e8914',
										data: Object.values(result['recovered'])
									},
									{
										label: 'Death cases',
										fill: false,
										lineTension: 0.5,
										backgroundColor: '#fff',
										hoverBackgroundColor: '#d62828',
										borderColor: '#d62828',
										data: Object.values(result['deaths'])
									}
									]
								}
							}
						})
					}
				},
				error => {
					this.getWorldHistory();
					this.setState({
						worldHistory: {
							isLoaded: false,
							error: error,
							data: null
						},
						worldDeathHistory: {
							isLoaded: false,
							error: error,
							data: null
						}
					});
				}
			)
	}
	getIndianData() {
		fetch("https://api.covid19india.org/data.json")
			.then(res => res.json())
			.then(
				result => {
					if (result['cases_time_series'] !== undefined) {
						this.setState({
							india: {
								isLoaded: true,
								error: null,
								items: result['cases_time_series'][result['cases_time_series'].length - 1]
							}
						})
					}
				},
				error => {
					this.getIndianData();
					this.setState({
						india: {
							isLoaded: false,
							error: error
						}
					});
				}
			)
	}
	getGlobalData() {
		fetch("https://corona.lmao.ninja/v2/all?yesterday=false")
			.then(res => res.json())
			.then(
				result => {
					if (result !== undefined) {
						this.setState({
							worldwide: {
								isLoaded: true,
								error: null,
								items: result
							},
							piechart: {
								data: {
									labels: ["Confirmed Cases", "Total Deaths", "Total Recovered"],
									datasets: [{
										label: "Global effect from Covid-19",
										backgroundColor: ['#007bff', '#f70c0c', '#28a745'],
										hoverBackgroundColor: ['#1d3557', '#d90429', '#134611'],
										borderColor: '#fff',
										data: [result.cases, result.deaths, result.recovered]
									}]
								},
								isLoaded: true,
							},
						})
					}
				},
				error => {
					this.getGlobalData();
					this.setState({
						worldwide: {
							isLoaded: false,
							error: error
						},
						piechart: {
							isLoaded: false,
							error: error
						}
					});
				}
			)
	}

	getCountriesData() {
		fetch("https://corona.lmao.ninja/v2/countries?sort=cases")
			.then(res => res.json())
			.then(
				result => {
					// Sort code
					// if (result['Countries'] !== undefined) {
					// 	var result = [];
					// 	result = result['Countries'].slice();
					// 	result.sort(
					// 		function (a, b) {
					// 			return b['cases'] - a['cases'];
					// 		}
					// 	);
					// }
					// Sort code
					// var arr = [];
					var testsArr = [];
					for (let index = 0; index < 10; index++) {
						testsArr.push(result[index]);
					}
					result.filter((param) => {
						if (param['country'] === "India") {
							testsArr.push(param);
						}
						return 1;
					})
					this.setState({
						testsmillion: {
							data: {
								labels: [testsArr[0]['country'], testsArr[1]['country'], testsArr[2]['country'], testsArr[3]['country'], testsArr[4]['country'], testsArr[5]['country'], testsArr[6]['country'], testsArr[7]['country'], testsArr[8]['country'], testsArr[9]['country'], testsArr[10]['country']],
								datasets: [{
									label: "Tests conducted per 1 mil population",
									backgroundColor: 'rgba(29,53,87,0.5)',
									hoverBackgroundColor: 'rgba(29,53,87,0.7)',
									data: [testsArr[0]['testsPerOneMillion'], testsArr[1]['testsPerOneMillion'], testsArr[2]['testsPerOneMillion'], testsArr[3]['testsPerOneMillion'], testsArr[4]['testsPerOneMillion'], testsArr[5]['testsPerOneMillion'], testsArr[6]['testsPerOneMillion'], testsArr[7]['testsPerOneMillion'], testsArr[8]['testsPerOneMillion'], testsArr[9]['testsPerOneMillion'], testsArr[10]['testsPerOneMillion']]
								},
								{
									label: "Cases per 1 million",
									backgroundColor: '#000',
									hoverBackgroundColor: '#000',
									borderColor: '#000',
									type: 'line',
									fill: 'false',
									data: [testsArr[0]['casesPerOneMillion'], testsArr[1]['casesPerOneMillion'], testsArr[2]['casesPerOneMillion'], testsArr[3]['casesPerOneMillion'], testsArr[4]['casesPerOneMillion'], testsArr[5]['casesPerOneMillion'], testsArr[6]['casesPerOneMillion'], testsArr[7]['casesPerOneMillion'], testsArr[8]['casesPerOneMillion'], testsArr[9]['casesPerOneMillion'], testsArr[10]['casesPerOneMillion']]
								},
								]
							},
							isLoaded: true,
							error: null,
							date: testsArr[0]['updated']
						},
						hometable: {
							isLoaded: true,
							items: result
						},
						topfive: {
							data: {
								labels: [result[0]['country'], result[1]['country'], result[2]['country'], result[3]['country'], result[4]['country']],
								datasets: [{
									label: "Top 5 nations confirmed cases",
									backgroundColor: ['#662e9b', '#43bccd', '#538d22', '#ff5400', '#f9c80e'],
									hoverBackgroundColor: ['#4D2082', '#2F8A99', '#1a4301', '#DC4300', '#BD8C0A'],
									borderColor: '#fff',
									data: [result[0]['cases'], result[1]['cases'], result[2]['cases'], result[3]['cases'], result[4]['cases']]
								}]
							},
							isLoaded: true
						},
						topfivebarchart: {
							data: {
								labels: [result[0]['country'], result[1]['country'], result[2]['country'], result[3]['country'], result[4]['country']],
								datasets: [{
									label: ['Confirmed cases'],
									backgroundColor: ['#1d3557', '#1d3557', '#1d3557', '#1d3557', '#1d3557'],
									hoverBackgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff',],
									borderColor: '#000',
									data: [result[0]['cases'], result[1]['cases'], result[2]['cases'], result[3]['cases'], result[4]['cases']]
								},
								{
									label: ['Death cases'],
									backgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									hoverBackgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									borderColor: '#000',
									data: [result[0]['deaths'], result[1]['deaths'], result[2]['deaths'], result[3]['deaths'], result[4]['deaths']]
								},
								{
									label: ['Recovery Cases'],
									backgroundColor: ['#134611', '#134611', '#134611', '#134611', '#134611'],
									hoverBackgroundColor: ['#28a745', '#28a745', '#28a745', '#28a745', '#28a745'],
									borderColor: '#000',
									data: [result[0]['recovered'], result[1]['recovered'], result[2]['recovered'], result[3]['recovered'], result[4]['recovered']]
								}
								]
							},
							isLoaded: true
						},
						linechart: {
							data: {
								labels: [result[0]['country'], result[1]['country'], result[2]['country'], result[3]['country'], result[4]['country'], result[5]['country'], result[6]['country'], result[7]['country'], result[8]['country'], result[9]['country'], result[10]['country']],
								datasets: [{
									label: 'Confirmed cases',
									fill: false,
									lineTension: 0.5,
									backgroundColor: ['#1d3557', '#1d3557', '#1d3557', '#1d3557', '#1d3557'],
									hoverBackgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff',],
									borderColor: '#007bff',
									data: [result[0]['cases'], result[1]['cases'], result[2]['cases'], result[3]['cases'], result[4]['cases'], result[5]['cases'], result[6]['cases'], result[7]['cases'], result[8]['cases'], result[9]['cases'], result[10]['cases']]
								},
								{
									label: ['Death cases'],
									fill: false,
									lineTension: 0.5,
									backgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									hoverBackgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
									borderColor: '#d90429',
									data: [result[0]['deaths'], result[1]['deaths'], result[2]['deaths'], result[3]['deaths'], result[4]['deaths'], result[5]['deaths'], result[6]['deaths'], result[7]['deaths'], result[8]['deaths'], result[9]['deaths'], result[10]['deaths']]
								},
								{
									label: ['Recovery Cases'],
									fill: false,
									lineTension: 0.5,
									backgroundColor: ['#134611', '#134611', '#134611', '#134611', '#134611'],
									hoverBackgroundColor: ['#28a745', '#28a745', '#28a745', '#28a745', '#28a745'],
									borderColor: '#28a745',
									data: [result[0]['recovered'], result[1]['recovered'], result[2]['recovered'], result[3]['recovered'], result[4]['recovered'], result[5]['recovered'], result[6]['recovered'], result[7]['recovered'], result[8]['recovered'], result[9]['recovered'], result[10]['recovered']]
								}
								]
							},
							isLoaded: true
						}
					});
				},
				error => {
					this.getCountriesData();
					this.setState({
						testsmillion: {
							isLoaded: false,
							error: error,
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
						},
						linechart: {
							isLoaded: false,
							error: error
						}
					});
				}
			);
	}

	render() {
		return (
			<div id="home" className="container container-wrapper mt-4">
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<Numbers
								worldwideItems={this.state.worldwide.items} worldwideisLoaded={this.state.worldwide.isLoaded} worldwideError={this.state.worldwide.error}
								indiaItems={this.state.india.items} indiaisLoaded={this.state.india.isLoaded} indiaError={this.state.india.error}
								lastModified={this.state.india.lastModified}
								worldTime={this.state.hometable.items[0]['updated']}
							/>
						</div>
						<div className="col-md-4">
							<PieChart data={this.state.piechart.data} isLoaded={this.state.piechart.isLoaded} error={this.state.piechart.error} />
						</div>
					</div>
				</div>
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8 content-box-xs">
							<HomeTable items={this.state.hometable.items} isLoaded={this.state.hometable.isLoaded} error={this.state.hometable.error} />

						</div>
						<div className="col-md-4">
							<TopFive isLoaded={this.state.topfive.isLoaded} error={this.state.topfive.error} data={this.state.topfive.data} />
						</div>
						<div className="col-12">
							<TopFiveBarChart isLoaded={this.state.topfivebarchart.isLoaded} error={this.state.topfivebarchart.error} data={this.state.topfivebarchart.data} />
							<LineChart isLoaded={this.state.linechart.isLoaded} error={this.state.linechart.error} data={this.state.linechart.data} />
						</div>
					</div>
				</div>
				<div className="content-box-md">
					<TestsMillion isLoaded={this.state.testsmillion.isLoaded} error={this.state.testsmillion.error} data={this.state.testsmillion.data} date={this.state.testsmillion.date} />
				</div>
				<div className="content-box-md">
					<WorldTrend isLoaded={this.state.worldHistory.isLoaded} error={this.state.worldHistory.error} dates={this.state.worldHistory.dates} data={this.state.worldHistory.data} deaths={this.state.worldDeathHistory.data} recovered={this.state.worldRecoveredHistory.data} />
				</div>
				<div className="row content-box-md">
					<ContinentChart />
				</div>
			</div>
		);
	}
}

export default HomePage;