import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import styles from '../css/base.css';
import Collapsible from 'react-collapsible';

import VolunteerList from './adminVolunteers.js'

module.exports = React.createClass({

  // rawMarkup function for the volunteering job description
  rawMarkup: function() {
    var md = new Remarkable({html: true});
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  // Handle submit for the CSV file export
  handleSubmit: function(e) {
    e.preventDefault();
    var jobToExport = this.props.title.trim();
    console.log("Handling submit");
    if (!jobToExport) {
      return;
    }
    window.location =  '/api/export/specificJob' + "/" + jobToExport;//read  on stackoverlfow that you can't download a file using ajax for security reasons, so I think someone suggested using window.location.  from user bluish:  http://stackoverflow.com/questions/4545311/download-a-file-by-jquery-ajax
    console.log(jobToExport);
    this.setState({jobToExport: ''});
  },

  // Method to call the props removeVolunteer method when the remove button is pressed for a volunteer
  removeVolunteer: function(e) {
    e.jobToRemove = this.props.title
    this.props.removeVolunteer(e)
  },

  // Render method for this React class
  render: function() {
    return (
      <div className="job">
        <h2 className={styles.jobTitle}>
          {this.props.title}
        </h2>
        <span className={styles.italicizeElements} dangerouslySetInnerHTML={this.rawMarkup()} />
        <Link to={'/' + this.props.id}>Edit</Link>
        <div className={styles.accordionContainer}>
          <Collapsible classParentString={styles.accordion} trigger="Click to see volunteers" triggerWhenOpen="Click to hide volunteers">
            <VolunteerList data={this.props.workers} removeVolunteer={this.removeVolunteer}/>
          </Collapsible>
        </div>
        <form className={styles.JobExportForm} onSubmit={this.handleSubmit}>
          <input type="submit" value="Export" />
        </form>
      </div>
    );
  }
});
