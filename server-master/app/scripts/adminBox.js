import React from 'react';

import $ from 'jquery';
import JobList from './adminVolunteerJobList.js'
import JobForm from './adminForm.js'

module.exports = React.createClass({

  getInitialState: function(){
    return {data: []};
  },

  // Use to AJAX to get jobs from the server
  loadJobsFromServer: function() {
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
      })
      .done(function(result){
          this.setState({data: result});
      }.bind(this))
      .fail(function(xhr, status, errorThrown) {
          console.error(this.props.url, status, err.toString());
      }.bind(this));
  },
  //the following method is a TODO, currently is just copied lab code
  handleJobSubmit: function(job) {
    var jobs = this.state.data;
    var newJobs = jobs.concat([job]);
    this.setState({data: newJobs});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: job,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: jobs});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


    // Called automatically by React after a component is rendered for the first time
    componentDidMount: function() {
        this.loadJobsFromServer();
        setInterval(this.loadJobsFromServer, this.props.pollInterval);
    },

  render: function() {
    return (
      <div className="adminBox">
        <h1>Volunteering Jobs</h1>
        <JobList data={this.state.data} />
        <JobForm onJobSubmit={this.handleJobSubmit} />
      </div>
    );
  }
});