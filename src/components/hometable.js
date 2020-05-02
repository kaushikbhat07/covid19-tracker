import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
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
				{ text: "Country", dataField: "country", sort: true },
				{ text: "Confirmed", dataField: "cases", sort: true },
				{ text: "Deaths", dataField: "deaths", sort: true },
				{ text: "Recovered", dataField: "recovered", sort: true }
			]
		};
	}

	componentDidMount() {

		$(document).ready(function () {
			$('table').addClass('table-responsive-sm').removeClass('table-bordered');
			// CSS
			$('table').css({ "width": "100%", "position": "relative", "overflow-y": "scroll" });
			$('.react-bootstrap-table').css({"max-height": "554px", "overflow-y": "scroll" });
			if ($(window).width() < 576) {
				$('#pageDropDown').addClass('mt-3 mb-3');
			}
			$('thead tr th:nth-child(3)').addClass('text-danger');
			$('thead tr th:nth-child(2)').addClass('text-primary');
			$('thead tr th:nth-child(4)').addClass('text-success');
			$('thead tr th:nth-child(1)').addClass('text-dark');
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