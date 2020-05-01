import React, { Component } from 'react';

class Numbers extends Component {
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
			if (this.props.worldwideisLoaded === true && this.props.worldwideItems !== null) {
				return (
					this.props.worldwideItems.TotalConfirmed.toLocaleString()
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
					this.props.worldwideItems.TotalRecovered.toLocaleString()
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
					this.props.worldwideItems.TotalDeaths.toLocaleString()
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
		const totalDeadIndia = () => {
			if (this.props.indiaisLoaded === true && this.props.indiaItems !== null) {
				return (
					this.props.indiaItems.TotalDeaths.toLocaleString()
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
					this.props.indiaItems.TotalRecovered.toLocaleString()
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
					this.props.indiaItems.TotalConfirmed.toLocaleString()
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
		return (
			<div className="numbers-data" >
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