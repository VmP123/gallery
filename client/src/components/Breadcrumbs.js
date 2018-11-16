import React from 'react';

import Breadcrumb from './Breadcrumb.js';

class Breadcrumbs extends React.Component {
	render() {
		return (
			<nav className="grey darken-3">
				<div className="nav-wrapper container row">
					<div className="col s12">
						{
							this.props.items.map((item, index) => {
								return <Breadcrumb key={index} getData={this.props.getData} name={item.name} url={item.url} />
							})
						}
					</div>
				</div>
			</nav>
		);
	}
}

export default Breadcrumbs;
