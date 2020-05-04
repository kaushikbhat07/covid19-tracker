import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { polarArea, Pie, Polar, Doughnut } from 'react-chartjs-2';

class ContinentChart extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			isLoaded: false,
			error: null,
			date: null,
			active: {
				data: null,
			},
			chartOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Active cases',
					fontSize: 20
				},
				legend: {
					display: true,
					position: 'top'
				}
			},
			chartDeathOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Death cases',
					fontSize: 20
				},
				legend: {
					display: true,
					position: 'top'
				}
			},
			chartRecoveredOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Recovered cases',
					fontSize: 20
				},
				legend: {
					display: true,
					position: 'top'
				}
			}
		});
	};

	componentDidMount() {
		this.getContinentData();
	}
	getContinentData() {
		fetch("https://corona.lmao.ninja/v2/continents?yesterday=false&sort=active")
			.then(res => res.json())
			.then(
				result => {
					var continentName = [], cases = [], deaths = [], recovered = [], active = [];
					result.map((sub) => {
						continentName.push(sub.continent);
						active.push(sub.active);
						deaths.push(sub.deaths);
						recovered.push(sub.recovered);
					})
					if (result !== undefined) {
						this.setState({
							isLoaded: true,
							error: null,
							date: result[0]['updated'],
							active: {
								data: {
									labels: continentName,
									datasets: [{
										label: "Active cases",
										backgroundColor: ['#f21b3f', '#ffe900', '#53b3cb', '#083d77', '#820263', '#5e3719'],
										borderColor: '#fff',
										data: active,
										borderWidth: "3"
									}
									]
								}
							},
							deaths: {
								data: {
									labels: continentName,
									datasets: [{
										label: "Deaths",
										backgroundColor: ['#d62828', '#2f3e46', '#fb5607', '#606c38', '#f08080', '#000000'],
										borderColor: '#fff',
										data: deaths,
										borderWidth: "3"
									}
									]
								},
							},
							recovered: {
								data: {
									labels: continentName,
									datasets: [{
										label: "Deaths",
										backgroundColor: ['#f29559', '#3e8914', '#9e2a2b', '#6a4c93', '#242423', '#b36a5e'],
										borderColor: '#fff',
										data: recovered,
										borderWidth: "3"
									}
									]
								},
							}
						})
					}
				},
				error => {
					this.getContinentData();
					this.setState({
						isLoaded: false,
						error: error
					});
				}
			)
	}
	printactiveChart() {
		if (this.state.isLoaded === true && this.state.error === null) {
			return (
				<Pie data={this.state.active.data} options={this.state.chartOptions} height={400} />
			);
		} else if (this.state.isLoaded === false && this.state.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if (this.state.isLoaded === false && this.state.error !== null) {
			return (
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
	}
	printDeathsChart() {
		if (this.state.isLoaded === true && this.state.error === null) {
			return (
				<Doughnut data={this.state.deaths.data} options={this.state.chartDeathOptions} height={400} />
			);
		} else if (this.state.isLoaded === false && this.state.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if (this.state.isLoaded === false && this.state.error !== null) {
			return (
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
	}
	printRecoveredChart() {
		if (this.state.isLoaded === true && this.state.error === null) {
			return (
				<Pie data={this.state.recovered.data} options={this.state.chartRecoveredOptions} height={400} />
			);
		} else if (this.state.isLoaded === false && this.state.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if (this.state.isLoaded === false && this.state.error !== null) {
			return (
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
	}
	convertGlobalTime() {
		if (this.state.isLoaded === true) {
			var dateUTC = new Date(this.state.date);
			dateUTC = dateUTC.getTime()
			var dateIST = new Date(dateUTC);
			dateIST.setHours(dateIST.getHours() + 5);
			dateIST.setMinutes(dateIST.getMinutes() + 30);

			var dateString = new Date(dateIST).toUTCString();
			dateString = dateString.split(' ').slice(0, 5).join(' ');
			return (dateString);
		}
	}
	render() {
		return (
			<React.Fragment>
				<div className="col-12 mb-4">
					<h3>Continent Wise Count</h3>
					<span className="text-muted">Last updated: {this.convertGlobalTime()}</span>
				</div>
				<div className="content-box-md col-md-4">
					<Card className="shadow">
						<CardBody>
							{this.printactiveChart()}
						</CardBody>
					</Card>
				</div>
				<div className="content-box-md col-md-4">
					<Card className="shadow">
						<CardBody>
							{this.printDeathsChart()}
						</CardBody>
					</Card>
				</div>
				<div className="content-box-md col-md-4">
					<Card className="shadow">
						<CardBody>
							{this.printRecoveredChart()}
						</CardBody>
					</Card>
				</div>
			</React.Fragment>
		);
	}
}

export default ContinentChart;