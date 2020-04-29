import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';

class PieChart extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			data: {
				labels: ["United States of America", "Spain", "Italy", "France", "UK"],
				datasets: [{
					label: "Top 5 nations affected",
					backgroundColor: ['#007bff', '#dc3545', '#28a745', '#dc3545', '#007bff'],
					hoverBackgroundColor: ['#1d3557', '#d90429', '#134611', '#007bff', '#dc3545'],
					borderColor: '#fff',
					data: [12, 10, 5, 45, 76],
				}]
			},
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
			}
		});
	};

	render() {
		return (
			<React.Fragment>
				<Card className="shadow">
					<CardBody>
						{/* <CardTitle>Piechart</CardTitle> */}
						<CardText>
							<Doughnut data={this.state.data} options={this.state.chartOptions} height={500} />
						</CardText>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	}
}

export default PieChart;