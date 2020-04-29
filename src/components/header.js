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
				<Navbar color="light" light expand="md" className="shadow">
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

{/* <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
	<a class="navbar-brand" href="index.html">
		<img src="assets/images/logo.png" alt="Covid-19 logo" />
	</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div class="navbar-nav">
			<a class="nav-item nav-link active" href="#">
				<i className="fa fa-home"></i>
				<span class="sr-only">(current)</span>
			</a>
			<a class="nav-item nav-link" href="#">Features</a>
			<a class="nav-item nav-link" href="#">Pricing</a>
			<a class="nav-item nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
		</div>
	</div>
	<div className="last-updated ml-auto">
		<span>Last updated 13 minutes ago</span>
	</div>
</nav> */}

export default TopNav;