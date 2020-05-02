import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class TopNav extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isNavOpen: false
		};
	}

	toggle() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		})
	}
	render() {

		return (
			<div>
				<Navbar color="light" light expand="md" className="shadow fixed-top">
					<NavbarBrand href="">
						<img src="assets/images/logo.png" alt="Covid-19 Logo" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isNavOpen} navbar center>
						<Nav className="m-auto text-center" navbar>
							<NavItem>
								<NavLink onClick={this.toggle}className="nav-link" to="/dashboard"><span className="fa fa-info-circle"></span></NavLink>
							</NavItem>
							<NavItem>
								<NavLink onClick={this.toggle} className="nav-link" to="/india"><span className="fa fa-home"></span></NavLink>
							</NavItem>
							<NavItem>
								<NavLink onClick={this.toggle} className="nav-link" to="/about"><span className="fa fa-question-circle"></span></NavLink>
							</NavItem>							
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default TopNav;