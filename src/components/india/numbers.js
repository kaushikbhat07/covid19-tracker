import React, { Component } from 'react';

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
			if (this.state.todaycases.isLoaded === true && this.state.todaycases.error === null && this.props.isLoaded === true && this.props.items !== null) {
				return (
					<sup className="text-danger">&nbsp;(+{this.state.todaycases.items['todayCases'].toLocaleString()})</sup>
				);
			} else if (this.state.todaycases.error) {
				return (
					unableToFetch()
				);
			}
		}
		const todayDeathsIndia = () => {
			if (this.state.todaycases.isLoaded === true && this.state.todaycases.error === null && this.props.isLoaded === true && this.props.items !== null) {
				return (
					<sup className="text-danger">&nbsp;(+{this.state.todaycases.items['todayDeaths'].toLocaleString()})</sup>
				);
			} else if (this.state.todaycases.error) {
				return (
					unableToFetch()
				);
			}
		}
		const totalDeadIndia = () => {
			if (this.props.isLoaded === true && this.props.items !== null) {
				return (
					parseInt(this.props.items.totaldeceased).toLocaleString()
				);
			} else if (this.props.error) {
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
			if (this.props.isLoaded === true && this.props.items !== null) {
				return (
					parseInt(this.props.items.totalrecovered).toLocaleString()
				);
			} else if (this.props.error) {
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
			if (this.props.isLoaded === true && this.props.items !== null) {
				return (
					parseInt(this.props.items.totalconfirmed).toLocaleString()
				);
			} else if (this.props.error) {
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
			if (this.props.isLoaded === true) {
				var dateUTC = new Date(this.state.india.lastModified);
				dateUTC = dateUTC.getTime()
				var dateIST = new Date(dateUTC);
				dateIST.setHours(dateIST.getHours() + 5);
				dateIST.setMinutes(dateIST.getMinutes() + 30);

				var dateString = new Date(dateIST).toUTCString();
				dateString = dateString.split(' ').slice(0, 5).join(' ');
				return (dateString);
			} else {
				return (<span></span>);
			}
		}
		return (
			<div className="numbers-data">
				<div class="row">
					<div className="col-md-12">
						<h3>Covid19 cases - India</h3><span className="text-muted">Last updated: {convertIndianDate()}</span>
					</div>
				</div>
				<div className="row mt-3">
					<div class="col-md-4 mb-4">
						<div class="card border-left-primary shadow h-100 py-2">
							<div class="card-body">
								<div class="row no-gutters align-items-center">
									<div class="col mr-2">
										<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
										<div class="h5 mb-0 font-weight-bold text-primary">{totalInfectedIndia()}
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
										<div class="h5 mb-0 font-weight-bold text-danger">{totalDeadIndia()}
											{todayDeathsIndia()}</div>
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