import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

class TopFive extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			chartOptions: {
				maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Confirmed cases',
					fontSize: 20
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
				<Doughnut data={this.props.data} options={this.state.chartOptions} height={500} />
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
				<Card className="shadow">
					<CardBody>
						<CardTitle className="text-uppercase text-center">Top 5 nations affected</CardTitle>
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