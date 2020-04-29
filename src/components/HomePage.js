import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';

class HomePage extends Component {
	render() {
		return (
			<div className="container container-wrapper mt-4">
				<div className="content-box-md">
					<div className="row">
						<div className="col-md-8">
							<Numbers />
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