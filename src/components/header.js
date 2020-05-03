import React, { Component, useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class TopNav extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

		this.state = {
			isNavOpen: false,
			isModalOpen: false
		};
	}

	toggle() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		})
	}
	toggleModal() {
		if (this.state.isNavOpen) {
			this.toggle();
		}
		this.setState({
			isModalOpen: !this.state.isModalOpen
		})
	}
	render() {

		return (
			<div>
				<Navbar color="light" light expand="md" className="shadow fixed-top">
					<NavbarBrand href="/">
						<img src="assets/images/logo.png" alt="Covid-19 Logo" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isNavOpen} navbar center>
						<Nav className="text-center icons-right" navbar>
							<NavItem>
								<NavLink onClick={this.toggle} className="nav-link" to="/dashboard"><span className="fa fa-info-circle"></span></NavLink>
							</NavItem>
							<NavItem>
								<NavLink onClick={this.toggle} className="nav-link" to="/india"><span className="fa fa-home"></span></NavLink>
							</NavItem>
							<NavItem onClick={this.toggleModal}>
								<a className="nav-link"><span className="fa fa-question-circle"></span></a>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>About this data</ModalHeader>
					<ModalBody>
						<h5>It changes rapidly.</h5>
						<p>
							This data changes rapidly, so what’s shown may be out of date. Table totals may not always represent an accurate sum. Information about reported cases is also available on the <a href="https://who.in" target="_blank">World Health Organization</a> & <a href="https://worldometers.info" target="_blank">worldoMeters.info</a>
						</p>
						<h5>It doesn’t include all cases</h5>
						<p>
							Confirmed cases aren’t all cases. They only include people who tested positive. Testing rules and availability vary by country.
						</p>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleModal}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default TopNav;