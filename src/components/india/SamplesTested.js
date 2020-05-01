import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

class SamplesTested extends Component {
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
		const displaySamplesTested = () => {
			
			if (this.props.isLoaded === true && this.props.items !== null) {
				return (
					<div>
						<h4><span className="text-danger">{parseInt(this.props.items.totalsamplestested).toLocaleString()}</span> samples have been tested as of {this.props.items.updatetimestamp}.&nbsp;
						<sub><a target="_blank" rel="noopener noreferrer" href={this.props.items.source}>Source <i className="fa fa-external-link-alt"></i></a></sub></h4>
						<a target="_blank" rel="noopener noreferrer" href="https://news.google.com/topics/CAAqBwgKMMqAmAsw9KmvAw?oc=3&ceid=IN:en" className="btn btn-primary text-uppercase text-light mt-4 mb-1">
							Latest COVID-19 NEWS
						</a>						
					</div>
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
				<div className="row mt-3">
					<div className="col-12 content-box-xs">
						<Card className="shadow">
							<CardBody className="text-center">
								{displaySamplesTested()}
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default SamplesTested;