import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

class Numbers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			india: {
				lastModified: ["-"],
				worldTime: this.props.worldTime
			},
			todaycases: {
				isLoaded: false,
				error: null,
				items: []
			}
		}
	}

	componentDidMount() {
		this.getIndiaDate();
		this.getTodayCases();
	}

	getTodayCases() {
		fetch("https://corona.lmao.ninja/v2/countries/india")
			.then(res => res.json())
			.then(
				result => {
					if (result !== undefined) {
						this.setState({
							todaycases: {
								isLoaded: true,
								error: null,
								items: result
							}
						})
					}
				},
				error => {
					this.getTodayCases();
					this.setState({
						todaycases: {
							isLoaded: false,
							error: error
						}
					});
				}
			)
	}

	getIndiaDate() {
		fetch("https://api.covid19india.org/data.json", {
			method: 'HEAD'
		})
			.then(
				response => {
					if (response.ok) {
						this.setState({
							india: {
								lastModified: response.headers.get('last-modified')
							}
						})
					}
				},
				error => {
					this.getIndiaDate();
					this.setState({
						india: {
							lastModified: error
						}
					})
				}
			)
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
		const todayCasesIndia = () => {
			if (this.state.todaycases.isLoaded === true && this.state.todaycases.error === null && this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				if (parseInt(this.state.todaycases.items['todayCases']) > 0) {
					return (
						<sup className="text-danger">(+{this.state.todaycases.items['todayCases'].toLocaleString()})</sup>
					);
				}
			} else if (this.state.todaycases.error) {
				return (
					unableToFetch()
				);
			}
		}
		const todayDeathsIndia = () => {
			if (this.state.todaycases.isLoaded === true && this.state.todaycases.error === null && this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				if (parseInt(this.state.todaycases.items['todayDeaths']) > 0) {
					return (
						<sup className="text-danger">(+{this.state.todaycases.items['todayDeaths'].toLocaleString()})</sup>
					);
				}
			} else if (this.state.todaycases.error) {
				return (
					unableToFetch()
				);
			}
		}
		const totalInfectedGlobal = () => {
			if (this.props.worldwideisLoaded === true && this.props.worldwideItems !== null) {
				return (
					<span>
						{this.props.worldwideItems.cases.toLocaleString()} <sup className="text-danger">(+{this.props.worldwideItems.todayCases.toLocaleString()})</sup>
					</span>
				);
			} else if (this.props.worldwideisLoaded === false && this.props.worldwideError != null) {
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
			if (this.props.worldwideisLoaded === true && this.props.worldwideItems !== null) {
				return (
					this.props.worldwideItems.recovered.toLocaleString()
				);
			} else if (this.props.worldwideisLoaded === false && this.props.worldwideError != null) {
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
			if (this.props.worldwideisLoaded === true && this.props.worldwideItems !== null) {
				return (
					<span>
						{this.props.worldwideItems.deaths.toLocaleString()} <sup className="text-danger">(+{this.props.worldwideItems.todayDeaths.toLocaleString()})</sup>
					</span>);
			} else if (this.props.worldwideisLoaded === false && this.props.worldwideError != null) {
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
			if (this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				return (
					parseInt(this.props.indiaItems.totaldeceased).toLocaleString()
				);
			} else if (this.props.indiaError) {
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
			if (this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				return (
					parseInt(this.props.indiaItems.totalrecovered).toLocaleString()
				);
			} else if (this.props.indiaError) {
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
			if (this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				return (
					parseInt(this.props.indiaItems.totalconfirmed).toLocaleString()
				);
			} else if (this.props.indiaError) {
				return (
					unableToFetch()
				);
			} else {
				return (
					loader()
				);
			}
		}
		const convertIndianDate = () => {
			if (this.props.indiaisLoaded === true) {
				var dateUTC = new Date(this.state.india.lastModified);
				dateUTC = dateUTC.getTime()
				var dateIST = new Date(dateUTC);
				dateIST.setHours(dateIST.getHours() + 5);
				dateIST.setMinutes(dateIST.getMinutes() + 30);

				var dateString = new Date(dateIST).toUTCString();
				dateString = dateString.split(' ').slice(0, 5).join(' ');
				return (dateString);
			} else {
				loader();
			}
		}
		const convertGlobalTime = () => {
			if (this.props.worldwideisLoaded === true) {
				var dateUTC = new Date(this.props.worldTime);
				dateUTC = dateUTC.getTime()
				var dateIST = new Date(dateUTC);
				dateIST.setHours(dateIST.getHours() + 5);
				dateIST.setMinutes(dateIST.getMinutes() + 30);

				var dateString = new Date(dateIST).toUTCString();
				dateString = dateString.split(' ').slice(0, 5).join(' ');
				return (dateString);
			} else {
				return (<span></span>)
			}
		}
		return (
			<FadeTransform
				in
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
				<div className="numbers-data">
					<div class="row">
						<div className="col-md-12">
							<h3>Coronavirus cases - Global</h3><span className="text-muted">Last updated: {convertGlobalTime()}</span>
						</div>
					</div>
					<div className="row mt-3">
						<div class="col-md-4 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
											<div class="h5 mb-0 font-weight-numbers text-primary">
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
											<div class="h5 mb-0 font-weight-numbers text-success">{totalRecoveredGlobal()}</div>
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
											<div class="h5 mb-0 font-weight-numbers text-danger">{totalDeadGlobal()}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div className="col-md-12">
							<div className="d-flex view-more-india"><h3>Coronavirus cases - India</h3>
								<h6 className="animated infinite heartBeat"><NavLink to="/india">View more</NavLink></h6>
							</div>
							<span className="text-muted">Last updated: {convertIndianDate()}</span>
						</div>
					</div>
					<div className="row mt-3">
						<div class="col-md-4 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
											<div class="h5 mb-0 font-weight-numbers text-primary">{totalInfectedIndia()}
												{todayCasesIndia()}</div>
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
											<div class="h5 mb-0 font-weight-numbers text-success">{totalReceoveredIndia()}</div>
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
											<div class="h5 mb-0 font-weight-numbers text-danger">{totalDeadIndia()}
												{todayDeathsIndia()}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FadeTransform>
		);
	}
}

export default Numbers;