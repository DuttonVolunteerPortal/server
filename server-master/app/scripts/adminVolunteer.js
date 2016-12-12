import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

module.exports = React.createClass({
  render: function() {
    console.log(this.props)
    return (
      <div className="volunteer">
        <p>{this.props.name}</p>
      </div>
    );
  }
});