import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Job from './adminVolunteerJob.js';

import styles from '../css/base.css';

module.exports = React.createClass({
  render: function() {
    var volunteerJobNodes = this.props.data.map(function(volunteerJob) {
      return (
        <Job id={volunteerJob.id} title={volunteerJob.title} key={volunteerJob.id} workers={volunteerJob.workers}>
          {volunteerJob.description}
        </Job>
      );
    });
    return (
      <div className={styles.adminJobList}>
        <h2 className={styles.jobListHeader}>Volunteering Jobs</h2>
        {volunteerJobNodes}
      </div>
    );
  }
});