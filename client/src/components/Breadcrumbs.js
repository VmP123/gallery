import React from 'react';
import { observer, inject } from 'mobx-react'
import Breadcrumb from './Breadcrumb.js';

@inject('store')
@observer
class Breadcrumbs extends React.Component {
	render() {
		return (
			<nav className="grey darken-3">
				<div className="nav-wrapper container row">
					<div className="col s12">
						{
							this.props.store.breadcrumbs.map((item, index) => {
								return <Breadcrumb key={index} getData={this.props.store.getData} name={item.name} url={item.url} />
							})
						}
					</div>
				</div>
			</nav>
		);
	}
}

export default Breadcrumbs;
