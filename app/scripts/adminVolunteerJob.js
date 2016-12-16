import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import styles from '../css/base.css';
import Collapsible from 'react-collapsible';

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
  removeVolunteer: function(e) {
    e.jobToRemove = this.props.title
    this.props.removeVolunteer(e)
  },
  render: function() {
    return (
      <div className="job">
        <h2 className="jobTitle">
          {this.props.title}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <div className={styles.accordionContainer}>
          <Collapsible classParentString={styles.accordion} trigger="Click to see volunteers" triggerWhenOpen="Click to hide volunteers">
            <VolunteerList data={this.props.workers} removeVolunteer={this.removeVolunteer}/>
            <form className={styles.JobExportForm} onSubmit={this.handleSubmit}>
              <input type="submit" value="Export" />
            </form>
          </Collapsible>
        </div>
      </div>
    );
  }
});
