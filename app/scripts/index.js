import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Redirect, browserHistory } from 'react-router';

import AdminBox from './adminBox'
import AdminEdit from './adminJobEdit'

import styles from '../css/base.css';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={AdminBox}/>
		<Route path="/:id" component={AdminEdit}/>
	</Router>
		),
	document.getElementById('content')
);