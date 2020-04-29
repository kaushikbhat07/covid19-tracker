import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			chartOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Global effect from Covid-19',
					fontSize: 20
				},
				legend: {
					display: true,
					position: 'top'
				}
			},
			worldwide: {
				isLoaded: false,
				error: null
			}
		});
	};

	componentDidMount() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					if(result['Global'] !== undefined) {
						this.setState({
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
							worldwide: {
								isLoaded: true
							}
						});
					}
				},
				error => {
					this.setState({
						worldwide: {
							isLoaded: false,
							error: error
						}
					});
				}
			);
	}

	printChart() {
		if (this.state.worldwide.isLoaded === true) {
			return (
				<Pie data={this.state.data} options={this.state.chartOptions} height={303} />
			);
		} else if (this.state.worldwide.isLoaded === false && this.state.worldwide.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if(this.state.worldwide.isLoaded === false && this.state.worldwide.error !== null) {
			return(
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
	}

	render() {
		return (
			<React.Fragment>
				<Card className="shadow">
					<CardBody>
						<CardText>
							{this.printChart()}
						</CardText>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	}
}

export default PieChart;