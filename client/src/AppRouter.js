import React from 'react';
import { observer } from 'mobx-react'
import { BrowserRouter, Route } from "react-router-dom";

import App from './App.js';

@observer
class AppRouter extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Route path="/:album*" component={App} />
			</BrowserRouter>
		);
	}
}

export default AppRouter;
