import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import Datatable from 'react-bs-datatable';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import $ from 'jquery';

const { SearchBar } = Search;

class HomeTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			header: [
				{ text: "Country", dataField: "Country", sort: true },
				{ text: "Confirmed", dataField: "TotalConfirmed", sort: true },
				{ text: "Deaths", dataField: "TotalDeaths", sort: true },
				{ text: "Recovered", dataField: "TotalRecovered", sort: true }
			]
		};
	}

	componentDidMount() {

		$(document).ready(function () {
			// $('.controlRow__root .form-control').attr("placeholder", "Search for a country...");
			$('table').addClass('table-responsive-sm').removeClass('table-bordered');
			// $('.controlRow__root .col-sm-2').removeClass('col-sm-2').addClass('col-md-6');
			// $('.controlRow__root .col-sm-4').removeClass('col-sm-4').addClass('col-md-6');
			// $('.controlRow__root .col-sm-6').removeClass('text-right col-sm-6').addClass('col-md-12 text-center mt-4');
			// $('table').addClass('table-borderless');
			// // $('table .thead-tr').addClass('bg-danger');
			// $('table .thead-tr td:nth-child(3)').addClass('text-danger');
			// $('table .thead-tr td:nth-child(4)').addClass('text-success');
			// $('table .thead-tr td:nth-child(2)').addClass('text-primary');
			// $('table .thead-tr td:nth-child(1)').addClass('text-dark');
			// $('.controlRow__root .input-group-append').remove();
			// $('.paginationOpts__root .form-group').addClass('m-auto text-center');
			// CSS
			$('table').css({ "width": "100%", "position": "relative", "overflow-y": "scroll" });
			$('.react-bootstrap-table').css({"max-height": "554px", "overflow-y": "scroll" });
			if ($(window).width() < 576) {
				$('#pageDropDown').addClass('mt-3 mb-3');
			}
			// $('.controlRow__root .btn-group').css({ "display": "inherit" });
			// $('.thead').css({ "position": "sticky", "top": "0", "left": "0", "right": "0", "background-color": "#eceaea" }).addClass('sticky-top');
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
			} else if (this.props.isLoaded === false && this.props.error === null) {
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
						{/* <Datatable
							tableHeaders={this.state.header}
							tableBody={this.props.items}
							keyName="countryTable"
							tableClass="striped hover table-responsive"
							rowsPerPage={10}
							rowsPerPageOption={[7, 10, 25, 50, 100, 200, 500]}
						/> */}
						{/* <BootstrapTable keyField="id" data={this.props.items} columns={ this.state.columns} filter={ filterFactory()} pagination={paginationFactory() } />							 */}
						<ToolkitProvider
							keyField="id"
							data={this.props.items}
							columns={this.state.header}
							search
						>
							{
								props => (
									<div>
										<SearchBar {...props.searchProps} />
										<hr />
										<BootstrapTable
											{...props.baseProps}
											pagination={paginationFactory()}
										/>
									</div>
								)
							}
						</ToolkitProvider>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default HomeTable;