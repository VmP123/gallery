import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';

import App from './App.js';
import AppStore from './AppStore.js';

ReactDOM.render((
	<Provider store={new AppStore()}>
		<App />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
