import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Line } from 'react-chartjs-2';

class IndianTrend extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			cases: {
				chartOptions: {
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Covid-19 trend India',
						fontSize: 18
					},
					legend: {
						display: true,
						position: 'bottom'
					}
				}
			}
		});
	};

	printChart() {
		if (this.props.isLoaded === true) {
			return (
				<Line data={this.props.data} options={this.state.cases.chartOptions} height={450} />
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

	displayDate() {
		if (this.props.dates !== null) {
			return (
				this.props.dates
			);
		}
	}
	render() {
		return (
			<React.Fragment>
				<div className="row mb-4">
					<div className="col-12">
						<div className="mb-4">
							<h3>Covid-19 cases India timeline - All time</h3>
							<span className="text-muted">Cases considered since: {this.displayDate()}</span>
						</div>
					</div>
					<div className="col-12">
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

export default IndianTrend;