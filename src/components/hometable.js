import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import Datatable from 'react-bs-datatable';
import $ from 'jquery';

class HomeTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};

		this.header = [
			{ title: "Country", prop: "Country", sortable: true, filterable: true },
			{ title: "Confirmed", prop: "TotalConfirmed", sortable: true, filterable: true },
			{ title: "Deaths", prop: "TotalDeaths", sortable: true, filterable: true },
			{ title: "Recovered", prop: "TotalRecovered", sortable: true, filterable: true }
		];
	}

	componentDidMount() {
		fetch("https://api.covid19api.com/summary")
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						isLoaded: true,
						items: result['Countries']
					});
				},
				error => {
					this.setState({
						isLoaded: true,
						error: error
					});
				}
			);

		$(document).ready(function () {
			$('.controlRow__root .form-control').attr("placeholder", "Search for a country...");
			$('table').addClass('table-responsive table-bordered text-center');
			$('.controlRow__root .col-sm-2').removeClass('col-sm-2').addClass('col-md-6');
			$('.controlRow__root .col-sm-4').removeClass('col-sm-4').addClass('col-md-6');
			$('.controlRow__root .col-sm-6').removeClass('text-right col-sm-6').addClass('col-md-12 text-center mt-4');
			$('table').addClass('table-borderless');
			// $('table .thead-tr').addClass('bg-danger');
			$('table .thead-tr td:nth-child(3)').addClass('text-danger');
			$('table .thead-tr td:nth-child(4)').addClass('text-success');
			$('table .thead-tr td:nth-child(2)').addClass('text-primary');
			$('table .thead-tr td:nth-child(1)').addClass('text-dark');
			$('.controlRow__root .input-group-append').remove();
			$('.paginationOpts__root .form-group').addClass('m-auto text-center');
		});
	}

	render() {
		return (
			<div className="mb-4">
				<h3 className="all-country-title">All Countries</h3>
				<Card className="shadow">
					<CardBody>
						<Datatable
							tableHeaders={this.header}
							tableBody={this.state.items}
							keyName="countryTable"
							tableClass="striped hover table-responsive"
							rowsPerPage={10}
							rowsPerPageOption={[7, 10, 25, 50, 100, 200, 500]}
							// initialSort={{ prop: 'TotalConfirmed TotalDeaths', isAscending: false }}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default HomeTable;