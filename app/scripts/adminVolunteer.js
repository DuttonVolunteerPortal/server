import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

module.exports = React.createClass({
  removeVolunteer: function() {
    var data = {
      jobToRemove: "",
      name: ""
    };
    console.log(this.props)
    data.name = this.props.name;
    this.props.removeVolunteer(data)
  },
  render: function() {
    return (
      <div className="volunteer">
        <form className="removeVolunteer" onSubmit={this.removeVolunteer}>
          <p>{this.props.name}</p>
          <input type="submit" value="remove"/>
        </form>
      </div>
    );
  }
});
