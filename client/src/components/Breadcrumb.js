import React from 'react';
import { action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Breadcrumb extends React.Component {
	render() {
		return <span className="breadcrumb" onClick={this.getData}>{this.props.name}</span>
	}

	@action getData = () => {
		this.props.getData(this.props.url);
	}
}

export default Breadcrumb;
