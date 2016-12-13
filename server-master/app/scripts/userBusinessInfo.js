import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	
	getInitialState: function() {
		return {name: '', email: ''};
	},
	handleBodyChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var name = this.state.body.trim();
		if (!body) {
			return;
		}
		this.props.onUserSubmit({body: body});
		this.setState({body: ''}); 
	},
	render: function() {
		return (
			<div>
				<strong>Business Information (if applicable)</strong>
				<form className="businessInfo" onSubmit={this.handleSubmit}>
					<input className="ui-widget ui-corner-all" type="text"
						value={this.state.name} onChange={this.handleBodyChange}
					/>
				</form>
			</div>
		);
	}
});