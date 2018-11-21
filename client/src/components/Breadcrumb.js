import React from 'react';
import { observer } from 'mobx-react'
import { Link } from "react-router-dom";

@observer
class Breadcrumb extends React.Component {
	render() {
		return <Link to={this.props.url.substring(7)} className="breadcrumb"><span className="breadcrumb" >{this.props.name}</span></Link>
	}
}

export default Breadcrumb;
