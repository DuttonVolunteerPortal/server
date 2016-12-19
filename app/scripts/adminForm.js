import React from 'react';
import $ from 'jquery';

import styles from '../css/base.css';

module.exports = React.createClass({

  // Get the initial state of this React class
  getInitialState: function() {
    return {volunteer_job: '', volunteer_description: ''};
  },

  // Handle when the job field changes
  handleJobChange: function(e) {
    this.setState({volunteer_job: e.target.value});
  },

  // Handle when the description field changes
  handleDescriptionChange: function(e) {
    this.setState({volunteer_description: e.target.value});
  },

  // Handle the submit button to call props onJobSubmit by sending the necessary information
  handleSubmit: function(e) {
    e.preventDefault();
    var volunteer_job = this.state.volunteer_job.trim();
    var volunteer_description = this.state.volunteer_description.trim();
    if (!volunteer_job || !volunteer_description) {
      return;
    }
    // TODO: send request to the server
    this.props.onJobSubmit({volunteer_job: volunteer_job, volunteer_description: volunteer_description});
    this.setState({volunteer_job: '', volunteer_description: ''});
  },

  // Render method for this React class
  render: function() {
    return (
      <div className={styles.adminJobForm}>
      <h2 className={styles.ListHeader}>Create a New Job</h2>
      <form className="jobForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={this.state.volunteer_job}
          onChange={this.handleJobChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={this.state.volunteer_description}
          onChange={this.handleDescriptionChange}
        />
        <input type="submit" value="Create" />
      </form>
      </div>
    );
  }
});
