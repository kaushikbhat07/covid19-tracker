import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			worldwide: {
				isLoaded: false,
				items: null,
				error: null
			},
			india: {
				isLoaded: false,
				items: null,
				error: null
			}
		}
	}
	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					var indiaArr = [];
					result['Countries'].filter((param) => {
						if (param['Slug'] === "india") {
							indiaArr = param;
						}
						return 1;
					})
					this.setState({
						worldwide: {
							isLoaded: true,
							items: result['Global']
						},
						india: {
							isLoaded: true,
							items: indiaArr
						}
					});
				},
				error => {
					this.getData();
					this.setState({
						worldwide: {
							isLoaded: false,
							error: error
						},
						india: {
							isLoaded: false,
							error: error
						}
					});
				}
			);
	}

	render() {
		return (
			<div className="container container-wrapper mt-4">
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<Numbers
								worldwideItems={this.state.worldwide.items} worldwideisLoaded={this.state.worldwide.isLoaded} worldwideError={this.state.worldwide.error}
								indiaItems={this.state.india.items} indiaisLoaded={this.state.india.isLoaded} indiaError={this.state.india.error}
							/>
						</div>
						<div className="col-md-4">
							<PieChart />
						</div>
					</div>
				</div>
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<HomeTable />
						</div>
						<div className="col-md-4">
							<TopFive />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;