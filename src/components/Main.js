import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Numbers from './numbers';
import PieChart from './PieChart';
import HomeTable from './hometable';
import TopFive from './topfive';

class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
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
				<Footer />
			</React.Fragment>
		);
	}
}

export default Main;