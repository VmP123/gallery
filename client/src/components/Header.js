import React from 'react';

import Breadcrumbs from './Breadcrumbs.js';

class Header extends React.Component {
	render() {
		return (
			<div>
				<nav className="top-nav">
					<div className="container">
						<div className="nav-wrapper">
							<div>
								<div className="col s12 m10 offset-m1">
									<h1 className="grey-text text-darken-3 header-text">Valokuvagalleria</h1>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<Breadcrumbs />
			</div>
		);
	}
}

export default Header;
