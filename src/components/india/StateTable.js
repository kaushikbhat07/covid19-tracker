import React, { Component, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import DataTable from 'react-data-table-component';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';
import './StateTable.css';
import $ from 'jquery';
import { Bar } from 'react-chartjs-2';

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
				<div className="mb-4 of-hidden">
					<h3 className="">State-wise count</h3>
					<p className="text-muted animated infinite heartBeat delay-1s slow">Click on your state in the below table to check if your district lies in the <span className="text-danger">Red zone</span></p>
				</div>
				<Card className="shadow">
					<CardBody>
						{loader()}
						{/* {console.log(this.props.items)} */}
						<DataTable
							keyField='id0'
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

	const ExpanableComponent = ({ data, zone }) => {
		var districtZone = [];
		zone.filter((param) => {
			if (param['district'] === data.district) {
				districtZone = param;
			}
			return 1;
		});
		const displayZone = () => {
			if (districtZone['zone'] === "Red") {
				return (
					<span className="text-danger"> {districtZone['zone']}</span>
				);
			} else if (districtZone['zone'] === "Orange") {
				return (
					<span className="text-orange"> {districtZone['zone']}</span>
				);
			}
			else if (districtZone['zone'] === "Green") {
				return (
					<span className="text-success"> {districtZone['zone']}</span>
				);
			} else {
				return (
					<span className="text-dark"> Unknown</span>
				);
			}
		}
		return (
			<div className="ml-3">
				<span className="text-muted">
					District: {data.district}
				</span><br />
				<span className="text-muted">
					Zone:
					{displayZone()}
				</span>
			</div>
		);
	}

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

	var paginationRows = [5, 10, 25, 50, 100];
	const externalCloseBtn = <button className="close" style={{ position: 'fixed', top: '20px', right: '30px', fontSize: '40px', color: '#fff' }} onClick={toggle}>&times;</button>;

	const printTodayConfirmed = () => {
		if (parseInt(data.deltaconfirmed) > 0) {
			return (
				<sup className="text-danger">(+{data.deltaconfirmed})</sup>
			);
		}
	}
	const printTodayRecovered = () => {
		if (parseInt(data.deltarecovered) > 0) {
			return (
				<sup className="text-success">(+{data.deltarecovered})</sup>
			);
		}
	}
	const printTodayDeaths = () => {
		if (parseInt(data.deltadeaths) > 0) {
			return (
				<sup className="text-danger">(+{data.deltadeaths})</sup>
			);
		}
	}
	const chartOptions = {
		maintainAspectRatio: false,
		title: {
			display: true,
			text: 'Comparision among districts (Top 5)',
			fontSize: 18
		},
		legend: {
			display: true,
			position: 'top'
		}
	};
	var districtResult = [], districtResultName = [], districtResultActive = [], districtResultDeath = [], districtResultRecovered = [], districtResultConfirmed = [];
	if (districtArr['districtData'] !== undefined) {
		districtResult = districtArr['districtData'].slice();
		districtResult.sort(
			function (a, b) {
				return b['confirmed'] - a['confirmed'];
			}
		);
	}
	if (districtResult.length > 5) {
		for (let index = 0; index < 5; index++) {
			districtResultName.push(districtResult[index]['district']);
			districtResultActive.push(districtResult[index]['active']);
			districtResultDeath.push(districtResult[index]['deceased']);
			districtResultRecovered.push(districtResult[index]['recovered']);
			districtResultConfirmed.push(districtResult[index]['confirmed']);
		}
	} else {
		for (let index = 0; index < districtResult.length; index++) {
			districtResultName.push(districtResult[index]['district']);
			districtResultActive.push(districtResult[index]['active']);
			districtResultDeath.push(districtResult[index]['deceased']);
			districtResultRecovered.push(districtResult[index]['recovered']);
			districtResultConfirmed.push(districtResult[index]['confirmed']);
		}
	}
	const chartData = {
		labels: districtResultName,
		datasets: [
			{
				label: "Active Cases",
				backgroundColor: 'rgba(5, 130, 202,0.7)',
				hoverBackgroundColor: 'rgba(5, 130, 202,0.9)',
				data: districtResultActive
			},
			{
				label: "Death Cases",
				backgroundColor: 'rgba(214, 40, 40,0.7)',
				hoverBackgroundColor: 'rgba(214, 40, 40,0.9)',
				data: districtResultDeath
			},
			{
				label: "Recovery Cases",
				backgroundColor: 'rgba(26, 67, 1,0.7)',
				hoverBackgroundColor: 'rgba(26, 67, 1,0.9)',
				data: districtResultRecovered
			}
		]
	}
	return (
		<div className="district-modal-btn">
			<Button onClick={toggle} className="btn-sm ">Click here</Button> for district-level data of {data.state}
			<Modal fade={false} isOpen={modal} toggle={toggle} external={externalCloseBtn}>
				<ModalHeader toggle={toggle}>
					<h3>{data.state}</h3>
					<span className="text-muted">Last updated: {data.lastupdatedtime}</span>
				</ModalHeader>
				<ModalBody>
					<div className="row mt-3">
						<div class="col-md-4 mb-4">
							<div class="card border-left-primary shadow h-100 py-2">
								<div class="card-body">
									<div class="row no-gutters align-items-center">
										<div class="col mr-2">
											<div class="text-xs font-weight-bold text-uppercase mb-1">Total Infected</div>
											<div class="h5 mb-0 font-weight-numbers text-primary">{data.confirmed.toLocaleString()} {printTodayConfirmed()}</div>
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
											<div class="h5 mb-0 font-weight-numbers text-success">{(data.recovered).toLocaleString()} {printTodayRecovered()}</div>
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
											<div class="h5 mb-0 font-weight-numbers text-danger">{data.deaths} {printTodayDeaths()}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h5>District-wise count</h5>
					<span className="text-muted">Select your district below to check if your district lies in the <span className="text-danger">Red zone</span>. Scroll down futher to see <span className="text-success">Green zone</span> districts</span>
					<DataTable
						keyField='id1'
						// title="District-wise count"
						columns={columnsDistrict}
						data={districtArr['districtData']}
						pagination="true"
						expandableRows="true"
						expandOnRowClicked="true"
						expandableRowsComponent={<ExpanableComponent zone={zoneArr} />}
						className="table-district-data"
						highlightOnHover="true"
						paginationPerPage="50"
						paginationRowsPerPageOptions={paginationRows}
						pointerOnHover="true"
					/>
					<h5>{data.state} district zones</h5>
					<span className="text-muted">Zone data of all districts (includes <span className="text-success">green zones</span>)</span>
					<DataTable
						keyField='id2'
						// title={data.state + " district zones"}
						columns={columnsDistrictZones}
						data={zoneArr}
						pagination="true"
						expandableRows="true"
						expandOnRowClicked="true"
						expandableRowsComponent={<ExpanableComponent zone={zoneArr} />}
						className="table-zone-data"
						highlightOnHover="true"
						paginationPerPage="50"
						paginationRowsPerPageOptions={paginationRows}
						pointerOnHover="true"
					/>
					<div className="text-center mt-3">
						<a className="btn btn-primary btn-sm text-light" target="_blank" rel="noopener noreferrer" href="https://www.indiatoday.in/information/story/coronavirus-centre-issues-state-wise-division-of-red-orange-and-green-zone-here-s-how-they-will-differ-1673222-2020-05-01">Click here <i className="fa fa-external-link"></i></a> to know what these <span className="text-danger">zones</span> mean.
					</div>
					<div className="row mt-5">
						<div className="col-12">
							<div className="mb-3">
								<h5>Most affected districts in {data.state}</h5>
								<span className="text-muted">Click on any label below to hide it from the chart</span>
							</div>
							<Card className="shadow">
								<CardBody>
									<Bar data={chartData} options={chartOptions} height="450"></Bar>
								</CardBody>
							</Card>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button onClick={toggle}>Close</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default StateTable;