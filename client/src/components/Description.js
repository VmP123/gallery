import React from 'react';

class Description extends React.Component {
	render() {
		return (
			<div className="section no-pad-bot">
				<div className="container" >
					<div className="flow-text grey-text text-darken-3">{this.props.text}</div>
				</div>
			</div>
		)
	}
}

export default Description;
