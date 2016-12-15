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
        <div>
          <Volunteer name={volunteer}/>
          <form className="removeVolunteer" onSubmit={removeVolunteer}>
            <input type="submit" value="remove"/>
          </form>
        </div>
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
