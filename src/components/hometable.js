import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import Datatable from 'react-bs-datatable';
import $ from 'jquery';

class HomeTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			header: [
				{ title: "Country", prop: "Country", sortable: true, filterable: true },
				{ title: "Confirmed", prop: "TotalConfirmed", sortable: true, filterable: true },
				{ title: "Deaths", prop: "TotalDeaths", sortable: true, filterable: true },
				{ title: "Recovered", prop: "TotalRecovered", sortable: true, filterable: true }
			]
		};
	}

	componentDidMount() {

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
			// CSS
			$('.controlRow__root').css({ "margin-bottom": "20px" });
			$('table').css({ "width": "100%", "height": "543px", "background-color": "#eceaea", "position": "relative" });
			$('.controlRow__root .btn-group').css({ "display": "inherit" });
			$('.thead').css({ "position": "sticky", "position": "-webkit-sticky", "top": "0", "left": "0", "right": "0", "background-color": "#eceaea" });
		});
	}

	render() {
		const loader = () => {
			if (this.props.isLoaded === false && this.props.error !== null) {
				return (
					<div className="text-center">
						<i className="fa fa-exclamation-triangle"></i>
					</div>
				);
			} else if(this.props.isLoaded === false && this.props.error === null) {
				return (
					<div className="text-center">
						<img width="70" height="70" src="assets/images/loader.gif" alt="Loading..." />
					</div>
				);
			}
		}
		return (
			<div className="mb-4">
				<h3 className="all-country-title">All Countries</h3>
				<Card className="shadow">
					<CardBody>
						{loader()}
						<Datatable
							tableHeaders={this.state.header}
							tableBody={this.props.items}
							keyName="countryTable"
							tableClass="striped hover table-responsive"
							rowsPerPage={10}
							rowsPerPageOption={[7, 10, 25, 50, 100, 200, 500]}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default HomeTable;