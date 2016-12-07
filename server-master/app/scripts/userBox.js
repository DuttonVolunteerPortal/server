import React from 'react';

import $ from 'jquery';
import ContactInfo from './userContactInfo.js'
import CategoryList from './userCategoryList.js'
import BusinessInfo from './userBusinessInfo.js'

module.exports = React.createClass({
  getInitialState: function(){
    return {data: [{title: "Baker"}]};
  },
  componentDidMount: function() {
  },
  handleUserSubmit: function(user) {
	  //TODO: Use ajax call to add user to database
  },
  render: function() {
    return (
      <div className="userBox" >
        <h1>Volunteer Submission Form</h1>
        <ContactInfo onUserSubmit={this.handleUserSubmit} />
		<CategoryList data={this.state.data} />
		<BusinessInfo onBusinessSubmit={this.handleBusinessSubmit} />
      </div>
    );
  }
});