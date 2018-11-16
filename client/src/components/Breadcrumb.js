import React from 'react';
import { action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Breadcrumb extends React.Component {
	render() {
		return <a href="!#" className="breadcrumb" onClick={this.getData}>{this.props.name}</a>
	}
	
	@action getData = () => {
		this.props.getData(this.props.url);
	}
}

export default Breadcrumb;
