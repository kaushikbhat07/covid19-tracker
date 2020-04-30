import React, { Component } from 'react';

class Numbers extends Component {

	constructor(props) {
		super(props);

		this.state = {
			worldwide: {
				error: false,
				isLoaded: false,
				items: []
			},
			india: {
				error: false,
				isLoaded: false,
				items: [],
				time: null
			}
		};
	}

	componentDidMount() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						worldwide: {
							isLoaded: true,
							items: result['Global'],
						}
					});
				},
				error => {
					this.setState({
						worldwide: {
							isLoaded: true,
							error: error
						}
					});
				}
			);
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					
					this.setState({
						india: {
							isLoaded: true,
							items: result['Countries'][101],
							time: this.state.india.items['Date']
						}
					});
				},
				error => {
					this.setState({
						india: {
							isLoaded: true,
							error: error
						}
					});
				}
			);
	}

	render() {
		const loader = () => {
			return (
				<div className="text-center">
					<img alt="Loading..." width="70" height="70" src="assets/images/loader.gif" />
				</div>
			);
		}
		const unableToFetch = () => {
			return (
				<div className="text-center">
					<i className="fa fa-exclamation-triangle"></i>
				</div>
			);
		}
		const totalInfectedGlobal = () => {
			if (this.state.worldwide.isLoaded === true && this.state.worldwide.items !== undefined) {
				return (
					this.state.worldwide.items['TotalConfirmed']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const totalRecoveredGlobal = () => {
			if (this.state.worldwide.isLoaded === true && this.state.worldwide.items !== undefined) {
				return (
					this.state.worldwide.items['TotalRecovered']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const totalDeadGlobal = () => {
			if (this.state.worldwide.isLoaded === true && this.state.worldwide.items !== undefined) {
				return (
					this.state.worldwide.items['TotalDeaths']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const totalDeadIndia = () => {
			if (this.state.india.isLoaded === true && this.state.india.items !== undefined) {
				return (
					this.state.india.items['TotalDeaths']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const totalReceoveredIndia = () => {
			if (this.state.india.isLoaded === true && this.state.india.items !== undefined) {
				return (
					this.state.india.items['TotalRecovered']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const totalInfectedIndia = () => {
			if (this.state.india.isLoaded === true && this.state.india.items !== undefined) {
				return (
					this.state.india.items['TotalConfirmed']
				);
			} else if (this.state.worldwide.error) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		return (
			<div className="numbers-data">
				<div class="row">
					<div className="col-md-12">
						<h3>Covid19 cases - Global</h3>
					</div>
				</div>
				<div className="row mt-3">
					<div class="col-md-4 mb-4">
						<div class="card border-left-primary shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
										<div class="h5 mb-0 font-weight-bold text-primary">
											{totalInfectedGlobal()}
										</div>
									</div>								
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-4 mb-4">
						<div class="card border-left-success shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Recovered</div>
										<div class="h5 mb-0 font-weight-bold text-success">{totalRecoveredGlobal()}</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-4 mb-4">
						<div class="card border-left-danger shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Deaths</div>
										<div class="h5 mb-0 font-weight-bold text-danger">{totalDeadGlobal()}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div className="col-md-12">
						<h3>Covid19 cases - India</h3>
					</div>
				</div>
				<div className="row mt-3">
					<div class="col-md-4 mb-4">
						<div class="card border-left-primary shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
										<div class="h5 mb-0 font-weight-bold text-primary">{totalInfectedIndia()}</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-4 mb-4">
						<div class="card border-left-success shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Recovered</div>
										<div class="h5 mb-0 font-weight-bold text-success">{totalReceoveredIndia()}</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-md-4 mb-4">
						<div class="card border-left-danger shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Deaths</div>
										<div class="h5 mb-0 font-weight-bold text-danger">{totalDeadIndia()}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Numbers;