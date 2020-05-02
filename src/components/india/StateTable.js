import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
// import Datatable from 'react-bs-datatable';
import DataTable from 'react-data-table-component';

import $ from 'jquery';

class StateTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{
					name: 'State',
					selector: 'state',
					sortable: true,
				},
				{
					name: 'Confirmed',
					selector: 'confirmed',
					sortable: true,
					center: true
				},
				{
					name: 'Deaths',
					selector: 'deaths',
					sortable: true,
					center: true
				},
				{
					name: 'Recovered',
					selector: 'recovered',
					sortable: true,
					center: true
				},
			],
			paginationrows: [5, 10, 15, 20, 25, 40]
		};
	}

	componentDidMount() {
		$('.rdt_TableBody').css({ "width": "100%", "height": "303px", "overflow-y": "scroll" });
		$('.rdt_TableCol_Sortable').addClass('font-weight-bold').css({"font-size" : "15px"});
		$('#column-confirmed div').addClass('text-primary');
		$('#column-deaths div').addClass('text-danger');
		$('#column-recovered div').addClass('text-success');
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
				<h3 className="all-country-title">State-wise count</h3>
				<Card className="shadow">
					<CardBody>
						{loader()}
						{console.log(this.props.items)}
						<DataTable
							title="Indian states affected"
							columns={this.state.columns}
							data={this.props.data}
							pagination="true"
							expandableRows="true"
							expandOnRowClicked="true"
							expandableRowsComponent={<ExpanableComponent />}
							className="table-india-states"
							highlightOnHover="true"
							paginationPerPage="25"
							paginationRowsPerPageOptions={this.state.paginationrows}
							pointerOnHover="true"
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}

const ExpanableComponent = ({ data }) => {
	return (
		<div></div>
		// <img src={data.image} />
	);
}

export default StateTable;