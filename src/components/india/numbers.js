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
		return (
			<div className="numbers-data">
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