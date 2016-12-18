import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Redirect, browserHistory } from 'react-router';

import AdminBox from './adminBox'
import AdminEdit from './adminJobEdit'

import styles from '../css/base.css';

/*
 * Render the ReactDOM using two main paths
 *		AdminBox is the default home page
 *		AdminEdit allows the admin to edit a particular job by taking them to a new React Route
 */
ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={AdminBox}/>
		<Route path="/:id" component={AdminEdit}/>
	</Router>
		),
	document.getElementById('content')
);