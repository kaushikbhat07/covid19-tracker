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
								<NavLink className="nav-link" to="/home"><span className="fa fa-home"></span></NavLink>
							</NavItem>
							{/* <NavItem>
								<NavLink className="nav-link" to='/about'><span className="fa fa-info fa-sm"></span> About Us</NavLink>
							</NavItem> */}
						</Nav>
					</Collapse>
					{/* <div className="last-updated ml-auto">
						<span>Last updated 13 minutes ago</span>
					</div> */}
				</Navbar>
			</div>
		);
	}
}

export default TopNav;