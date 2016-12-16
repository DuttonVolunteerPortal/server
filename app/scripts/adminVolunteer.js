import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

module.exports = React.createClass({
  removeVolunteer: function() {
    console.log(this.props.name)
  },
  render: function() {
    return (
      <div className="volunteer">
        <form className="removeVolunteer" onSubmit={this.removeVolunteer}>
          <h3>{this.props.name}</h3>
          <input type="submit" value="remove"/>
        </form>
      </div>
    );
  }
});
