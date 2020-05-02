import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import SamplesTested from './SamplesTested';
import StateTable from './StateTable';
import TopFiveState from './TopFiveState';
import TopFiveBarGraph from './TopFiveLineGraph';

class IndiaPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numbers: {
				isLoaded: false,
				error: null,
				items: null
			},
			piechart: {
				isLoaded: false,
				error: null,
				items: null
			},
			samplesTested: {
				isLoaded: false,
				error: null,
				items: null
			},
			stateTable: {
				isLoaded: false,
				error: null,
				items: ["-", "-", "-", "-"]
			},
			topfiveStates: {
				isLoaded: false,
				error: null
			},
			linechart: {
				isLoaded: false,
				error: null
			}
		}
	}
	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch("https://api.covid19india.org/data.json")
			.then(res => res.json())
			.then(
				result => {
					if (result['cases_time_series'] !== undefined) {
						var arrStatewise = [];
						arrStatewise = result['statewise'].slice();
						arrStatewise.shift();

						var topfiveSortedArr = [];
						topfiveSortedArr = result['statewise'].slice();
						topfiveSortedArr.sort(
							function (a, b) {
								return b['confirmed'] - a['confirmed'];
							}
						);
						for (let index = 0; index < arrStatewise.length; index++) {
							arrStatewise[index]['active'] = parseInt(arrStatewise[index]['active']);
							arrStatewise[index]['confirmed'] = parseInt(arrStatewise[index]['confirmed']); arrStatewise[index]['deaths'] = parseInt(arrStatewise[index]['deaths']);
							arrStatewise[index]['recovered'] = parseInt(arrStatewise[index]['recovered']);
						}

						this.setState({
							numbers: {
								items: result['cases_time_series'][result['cases_time_series'].length - 1],
								isLoaded: true,
								error: null
							},
							piechart: {
								data: {
									labels: ["Confirmed Cases", "Total Deaths", "Total Recovered"],
									datasets: [{
										label: "Effect of Covid-19 on India",
										backgroundColor: ['#007bff', '#f70c0c', '#28a745'],
										hoverBackgroundColor: ['#1d3557', '#d90429', '#134611'],
										borderColor: '#fff',
										data: [result['cases_time_series'][result['cases_time_series'].length - 1]['totalconfirmed'], result['cases_time_series'][result['cases_time_series'].length - 1]['totaldeceased'], result['cases_time_series'][result['cases_time_series'].length - 1]['totalrecovered']]
									}]
								},
								isLoaded: true,
							},
							samplesTested: {
								items: result['tested'][result['tested'].length - 1],
								error: null,
								isLoaded: true
							},
							stateTable: {
								isLoaded: true,
								error: null,
								items: arrStatewise
							},
							topfiveStates: {
								data: {
									labels: [topfiveSortedArr[1]['state'], topfiveSortedArr[2]['state'], topfiveSortedArr[3]['state'], topfiveSortedArr[4]['state'], topfiveSortedArr[5]['state']],
									datasets: [{
										label: "Top 5 states confirmed cases",
										backgroundColor: ['#662e9b', '#43bccd', '#538d22', '#ff5400', '#f9c80e'],
										hoverBackgroundColor: ['#4D2082', '#2F8A99', '#1a4301', '#DC4300', '#BD8C0A'],
										borderColor: '#fff',
										data: [topfiveSortedArr[1]['confirmed'], topfiveSortedArr[2]['confirmed'], topfiveSortedArr[3]['confirmed'], topfiveSortedArr[4]['confirmed'], topfiveSortedArr[5]['confirmed']]
									}]
								},
								isLoaded: true,
								error: null
							},
							linechart: {
								data: {
									labels: [topfiveSortedArr[1]['state'], topfiveSortedArr[2]['state'], topfiveSortedArr[3]['state'], topfiveSortedArr[4]['state'], topfiveSortedArr[5]['state'], topfiveSortedArr[6]['state'], topfiveSortedArr[7]['state'], topfiveSortedArr[8]['state'], topfiveSortedArr[9]['state'], topfiveSortedArr[10]['state']],
									datasets: [{
										label: 'Confirmed cases',
										fill: false,
										lineTension: 0.5,
										backgroundColor: ['#1d3557', '#1d3557', '#1d3557', '#1d3557', '#1d3557'],
										hoverBackgroundColor: ['#007bff', '#007bff', '#007bff', '#007bff', '#007bff',],
										borderColor: '#007bff',
										data: [topfiveSortedArr[1]['confirmed'], topfiveSortedArr[2]['confirmed'], topfiveSortedArr[3]['confirmed'], topfiveSortedArr[4]['confirmed'], topfiveSortedArr[5]['confirmed'], topfiveSortedArr[6]['confirmed'], topfiveSortedArr[7]['confirmed'], topfiveSortedArr[8]['confirmed'], topfiveSortedArr[9]['confirmed'], topfiveSortedArr[10]['confirmed']]
									},
									{
										label: ['Death cases'],
										fill: false,
										lineTension: 0.5,
										backgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
										hoverBackgroundColor: ['#d90429', '#d90429', '#d90429', '#d90429', '#d90429'],
										borderColor: '#d90429',
										data: [topfiveSortedArr[1]['deaths'], topfiveSortedArr[2]['deaths'], topfiveSortedArr[3]['deaths'], topfiveSortedArr[4]['deaths'], topfiveSortedArr[5]['deaths'], topfiveSortedArr[6]['deaths'], topfiveSortedArr[7]['deaths'], topfiveSortedArr[8]['deaths'], topfiveSortedArr[9]['deaths'], topfiveSortedArr[10]['deaths']]
									},
									{
										label: ['Recovery Cases'],
										fill: false,
										lineTension: 0.5,
										backgroundColor: ['#134611', '#134611', '#134611', '#134611', '#134611'],
										hoverBackgroundColor: ['#28a745', '#28a745', '#28a745', '#28a745', '#28a745'],
										borderColor: '#28a745',
										data: [topfiveSortedArr[0]['recovered'], topfiveSortedArr[1]['recovered'], topfiveSortedArr[2]['recovered'], topfiveSortedArr[3]['recovered'], topfiveSortedArr[4]['recovered'], topfiveSortedArr[5]['recovered'], topfiveSortedArr[6]['recovered'], topfiveSortedArr[7]['recovered'], topfiveSortedArr[8]['recovered'], topfiveSortedArr[9]['recovered'], topfiveSortedArr[10]['recovered']]
									}
									]
								},
								isLoaded: true,
								error: null
							}
						});
					}
				},
				error => {
					this.getData();
					this.setState({
						numbers: {
							isLoaded: false,
							error: error
						},
						piechart: {
							isLoaded: false,
							error: error
						},
						samplesTested: {
							isLoaded: false,
							error: error
						},
						stateTable: {
							isLoaded: false,
							error: error
						},
						topfiveStates: {
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
			<div className="container container-wrapper mt-4">
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<Numbers isLoaded={this.state.numbers.isLoaded} error={this.state.numbers.error} items={this.state.numbers.items} />
							<SamplesTested items={this.state.samplesTested.items} error={this.state.samplesTested.error} isLoaded={this.state.samplesTested.isLoaded} />
						</div>
						<div className="col-md-4">
							<PieChart data={this.state.piechart.data} isLoaded={this.state.piechart.isLoaded} error={this.state.piechart.error} />
						</div>
					</div>
				</div>
				<div>
					<div className="row">
						<div className="col-md-8 content-box-xs">
							<StateTable data={this.state.stateTable.items} isLoaded={this.state.stateTable.isLoaded} error={this.state.stateTable.error} />
						</div>
						<div className="col-md-4">
							<TopFiveState isLoaded={this.state.topfiveStates.isLoaded} error={this.state.topfiveStates.error} data={this.state.topfiveStates.data} />
						</div>
					</div>
				</div>
				<div className="content-box-md">
					<div className="row">
						<div className="col-12 content-box-xs">
							<TopFiveBarGraph data={this.state.linechart.data} isLoaded={this.state.linechart.isLoaded} error={this.state.linechart.error} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default IndiaPage;