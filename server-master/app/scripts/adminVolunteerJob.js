
import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import VolunteerList from './adminVolunteers.js'

module.exports = React.createClass({
   rawMarkup: function() {
    var md = new Remarkable({html: true});
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="job">
        <h2 className="jobTitle">
          {this.props.title}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <VolunteerList data={this.props.workers} />
      </div>
    );
  }
});
