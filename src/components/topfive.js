import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

class TopFive extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			chartOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Top 5 nations affected',
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
			},
			disp: []
		});
	};

	componentDidMount() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					if (result['Countries'] !== undefined) {

						result['Countries'].sort(
							function(a, b) {
								return b['TotalConfirmed'] - a['TotalConfirmed'];								
							}
						);

						this.setState({
							data: {
								labels: [result['Countries'][0]['Country'], result['Countries'][1]['Country'], result['Countries'][2]['Country'], result['Countries'][3]['Country'], result['Countries'][4]['Country']],
								datasets: [{
									label: "Top 5 nations affected",
									backgroundColor: ['#662e9b', '#43bccd', '#ea3546', '#f86624', '#f9c80e'],
									hoverBackgroundColor: ['#4D2082','#2F8A99', '#BB2531', '#C34719', '#BD8C0A'],
									borderColor: '#fff',
									data: [result['Countries'][0]['TotalConfirmed'], result['Countries'][1]['TotalConfirmed'], result['Countries'][2]['TotalConfirmed'], result['Countries'][3]['TotalConfirmed'], result['Countries'][4]['TotalConfirmed']]
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
				<Doughnut data={this.state.data} options={this.state.chartOptions} height={500} />
			);
		} else if (this.state.worldwide.isLoaded === false && this.state.worldwide.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if (this.state.worldwide.isLoaded === false && this.state.worldwide.error !== null) {
			return (
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
						{/* <CardTitle>Piechart</CardTitle> */}
						<CardText>
							{this.printChart()}
						</CardText>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	}
}

export default TopFive;