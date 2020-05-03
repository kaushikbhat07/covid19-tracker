import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';

class TestsMillion extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			chartOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Comparsion of tests conducted per million population',
					fontSize: 18
				},
				legend: {
					display: true,
					position: 'bottom'
				}
			}
		});
	};

	printChart() {
		if (this.props.isLoaded === true) {
			return (
				<Bar data={this.props.data} options={this.state.chartOptions} height={450} />
			);
		} else if (this.props.isLoaded === false && this.props.error === null) {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		} else if (this.props.isLoaded === false && this.props.error !== null) {
			return (
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
	}
	printDate = () => {
		if (this.props.isLoaded === true) {
			var dateUTC = new Date(this.props.date);
			dateUTC = dateUTC.getTime()
			var dateIST = new Date(dateUTC);
			dateIST.setHours(dateIST.getHours() + 5);
			dateIST.setMinutes(dateIST.getMinutes() + 30);

			var dateString = new Date(dateIST).toUTCString();
			dateString = dateString.split(' ').slice(0, 5).join(' ');
			return (dateString);
		} else {
			return (
				<div className="text-center">
					<img alt="Loading..." src="assets/images/loader.gif" />
				</div>
			);
		}
	}
	render() {
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-12">
						<div className="mb-4">
							<h3>Tests conducted per million population - Country wise</h3>
							<span className="text-muted">Last updated: {this.printDate()}</span>
						</div>
						<Card className="shadow">
							<CardBody>
								<CardText>
									{this.printChart()}
								</CardText>
							</CardBody>
						</Card>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default TestsMillion;