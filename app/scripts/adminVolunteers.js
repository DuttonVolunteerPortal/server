import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Volunteer from './adminVolunteer.js'

module.exports = React.createClass({
  render: function() {
    var volunteerNodes = this.props.data.map(function(volunteer) {
      let removeVolunteer = function(e) {
        console.log(volunteer)
      }
      return (
        <Volunteer name={volunteer}/>
      );
    });
    return (
      <div className="volunteerList">
      	<h3>Volunteers</h3>
        {volunteerNodes}
      </div>
    );
  }
});
