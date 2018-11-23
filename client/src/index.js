import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import AppStore from './stores/AppStore.js';
import AppRouter from './components/AppRouter.js';

ReactDOM.render((
	<Provider store={new AppStore()}>
		<AppRouter />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
