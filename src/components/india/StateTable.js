import React, { Component, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import DataTable from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import './StateTable.css';
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
					name: 'Active',
					selector: 'active',
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
			paginationrows: [5, 10, 15, 20, 25, 40],
			districtwise: {
				isLoaded: false,
				error: null,
				items: [],
				ModalOpen: true
			},
			zone: {
				isLoaded: false,
				error: null,
				items: []
			}
		};
	}

	componentDidMount() {
		this.getDistrictData();
		this.getZoneData();
		$(document).ready(function () {
			$('.rdt_TableBody').css({ "width": "100%", "height": "303px", "overflow-y": "scroll" });
			$('.rdt_TableCol_Sortable').addClass('font-weight-bold').css({ "font-size": "15px" });
			$('#column-confirmed div').addClass('text-primary');
			$('#column-deaths div').addClass('text-danger');
			$('#column-recovered div').addClass('text-success');
			$('#column-active div').addClass('text-warning');

			$('#column-zone div').addClass('text-danger');
			$('#column-lastupdated div').addClass('text-success');
		})
	}
	getZoneData() {
		fetch("https://api.covid19india.org/zones.json")
			.then(res => res.json())
			.then(
				result => {
					// if (result['zones'] !== undefined) {
					this.setState({
						zone: {
							isLoaded: true,
							error: null,
							items: result['zones']
						}
					})
					// }
				},
				error => {
					this.getDistrictData();
					this.setState({
						zone: {
							isLoaded: false,
							error: error
						}
					});
				}
			)
	}
	getDistrictData() {
		fetch("https://api.covid19india.org/v2/state_district_wise.json")
			.then(res => res.json())
			.then(
				result => {
					if (result !== undefined) {
						this.setState({
							districtwise: {
								isLoaded: true,
								error: null,
								items: result
							}
						})
					}
				},
				error => {
					this.getDistrictData();
					this.setState({
						districtwise: {
							isLoaded: false,
							error: error
						}
					});
				}
			)
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
						{/* {console.log(this.props.items)} */}
						<DataTable
							title="Indian states"
							columns={this.state.columns}
							data={this.props.data}
							pagination="true"
							expandableRows="true"
							expandOnRowClicked="true"
							expandableRowsComponent={<ExpanableComponent items={this.state.districtwise.items} zone={this.state.zone.items} />}
							className="table-india-states"
							highlightOnHover="true"
							paginationPerPage="40"
							paginationRowsPerPageOptions={this.state.paginationrows}
							pointerOnHover="true"
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}

const ExpanableComponent = ({ data, items, zone }) => {

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	var districtArr = [], zoneArr = [];
	items.filter((param) => {
		if (param['state'] === data.state) {
			districtArr = param;
		}
		return 1;
	});
	zone.filter((param) => {
		if (param['state'] === data.state) {
			zoneArr.push(param);
		}
		return 1;
	});

	var columnsDistrict = [
		{
			name: 'District',
			selector: 'district',
			sortable: true,
		},
		{
			name: 'Confirmed',
			selector: 'confirmed',
			sortable: true,
			center: true
		},
		{
			name: 'Active',
			selector: 'active',
			sortable: true,
			center: true
		},
		{
			name: 'Deaths',
			selector: 'deceased',
			sortable: true,
			center: true
		},
		{
			name: 'Recovered',
			selector: 'recovered',
			sortable: true,
			center: true
		}
	];
	var columnsDistrictZones = [
		{
			name: 'District',
			selector: 'district',
			sortable: true,
		},
		{
			name: 'Zone',
			selector: 'zone',
			sortable: true,
			center: true
		},
		{
			name: 'Last updated',
			selector: 'lastupdated',
			sortable: true,
			center: true
		}
	];
	const districtExpandable = () => {
		return (<div></div>);
	}
	var paginationRows = [5, 10, 25, 50, 100];
	const externalCloseBtn = <button className="close" style={{ position: 'fixed', top: '20px', right: '30px', fontSize: '40px', color: '#fff' }} onClick={toggle}>&times;</button>;
	return (
		<div className="district-modal-btn">
			<Button onClick={toggle} className="btn-sm ">Click here</Button> for district-level data of {data.state}
			<Modal fade={false} isOpen={modal} toggle={toggle} external={externalCloseBtn}>
				<ModalHeader toggle={toggle}>{data.state}</ModalHeader>
				<ModalBody>
					<div className="row mt-3">
						<div class="col-md-4 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
											<div class="h5 mb-0 font-weight-bold text-primary">{data.confirmed} <sup className="text-danger">(+{data.deltaconfirmed})</sup></div>
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
											<div class="h5 mb-0 font-weight-bold text-success">{data.recovered} <sup className="text-success">(+{data.deltarecovered})</sup></div>
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
											<div class="h5 mb-0 font-weight-bold text-danger">{data.deaths} <sup className="text-danger">(+{data.deltadeaths})</sup></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<span className="text-muted">Last updated: {data.lastupdatedtime}</span>
						</div>
					</div>

					<DataTable
						title="District-wise count"
						columns={columnsDistrict}
						data={districtArr['districtData']}
						pagination="true"
						expandableRows="false"
						expandOnRowClicked="false"
						expandableRowsComponent={districtExpandable}
						className="table-india-states"
						highlightOnHover="true"
						paginationPerPage="50"
						paginationRowsPerPageOptions={paginationRows}
						pointerOnHover="true"
					/>
					<DataTable
						title={data.state + " district zones"}
						columns={columnsDistrictZones}
						data={zoneArr}
						pagination="true"
						expandableRows="false"
						expandOnRowClicked="false"
						expandableRowsComponent={districtExpandable}
						className="table-zone-data"
						highlightOnHover="true"
						paginationPerPage="50"
						paginationRowsPerPageOptions={paginationRows}
						pointerOnHover="true"
					/>
				</ModalBody>
				<ModalFooter>
					<Button onClick={toggle}>Close</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default StateTable;