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
					text: 'Confirmed cases (Top 5)',
					fontSize: 18
				},
				legend: {
					display: true,
					position: 'top'
				}
			}
		});
	};

	printChart() {
		if (this.props.isLoaded === true) {
			return (
				<Doughnut data={this.props.data} options={this.state.chartOptions} height={525} />
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

	render() {
		return (
			<React.Fragment>
				<div className="mb-4">
					<div className="mb-4">
						<h3 className="">Most affected countries</h3>
						<span className="text-muted">Click on any label to hide it from the chart.</span>
					</div>
					<Card className="shadow">
						<CardBody>
							<CardText>
								{this.printChart()}
							</CardText>
						</CardBody>
					</Card>
				</div>
			</React.Fragment>
		);
	}
}

export default TopFive;