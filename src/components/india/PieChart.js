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
					text: 'Effect of Covid-19 on India',
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
				<Pie data={this.props.data} options={this.state.chartOptions} height={350} />
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