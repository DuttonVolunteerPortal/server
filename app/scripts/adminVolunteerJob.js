
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
  handleSubmit: function(e) {

    e.preventDefault();
    var jobToExport = this.props.title.trim();
    console.log("Handling submit");
    if (!jobToExport) {
      return;
    }
    window.location =  '/api/export/specificJob' + "/" + jobToExport;
    console.log(jobToExport);
    this.setState({jobToExport: ''});
  },
  render: function() {
    return (
      <div className="job">
      <h2 className="jobTitle">
      {this.props.title}
      </h2>
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
      <Link to={'/' + this.props.id}>Edit</Link>
      <VolunteerList data={this.props.workers} />
      <form className="JobExportForm" onSubmit={this.handleSubmit}>
      <input type="submit" value="Export" />
      </form>
      </div>
    );
  }
});
