import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="navbar navbar-dark bg-dark">
				<div className="container">
					<div className="row m-auto">
						<div className="col-md-12">
							<div className="social-icon-wrapper">
								<a href="https://github.com/kaushikbhat07/covid19-tracker" target="_blank" rel="noopener noreferrer" className="social-icons">
									<i className="fa fa-github"></i>
								</a>
								<a target="_blank" rel="noopener noreferrer" href="https://google form link/" className="social-icons">
									<i className="fa fa-bug"></i>
								</a>					
							</div>
						</div>
					</div>
				</div>
			</footer>			
		);
	}
}

export default Footer;