import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
	
	getInitialState: function() {
		return {name: '', email: ''};
	},
	handleNameChange: function(e) {
		this.setState({name: e.target.value});
	},
	handleEmailChange: function(e) {
		this.setState({email: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var name = this.state.name.trim();
		var email = this.state.email.trim();
		if (!name || !email) {
			return;
		}
		this.props.onUserSubmit({name: name, email: email});
		this.setState({name: '', email: ''}); //Or should we leave it there and not reset?
	},
	render: function() {
		return (
			<form className="contactInfo" onSubmit={this.handleSubmit}>
				<input className="ui-widget ui-corner-all" type="text" placeholder="Full Name"
					value={this.state.name} onChange={this.handleNameChange}
				/>
				<input className="ui-widget ui-corner-all" type="text" placeholder="Email"
					value={this.state.email} onChange={this.handleEmailChange}
				/>
				<input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
			</form>
		);
	}
});