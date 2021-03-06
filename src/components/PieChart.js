import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Pie } from 'react-chartjs-2';
import { FadeTransform } from 'react-animation-components';

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
			}
		});
	};

	printChart() {
		if (this.props.isLoaded === true) {
			return (
				<Pie data={this.props.data} options={this.state.chartOptions} height={342} />
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
				<FadeTransform
					in
					transformProps={{
						exitTransform: 'scale(0.5) translateY(-50%)'
					}}>
					<Card className="shadow">
						<CardBody>
							<CardText>
								{this.printChart()}
							</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			</React.Fragment>
		);
	}
}

export default PieChart;