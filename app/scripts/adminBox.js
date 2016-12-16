import React from 'react';
import $ from 'jquery';

import JobList from './adminVolunteerJobList.js';
import JobForm from './adminForm.js';

import {API_URL, POLL_INTERVAL} from './global';

module.exports = React.createClass({

  getInitialState: function(){
    return {data: []};
  },

  // Use to AJAX to get jobs from the server
  loadJobsFromServer: function() {
      $.ajax({
          url: API_URL,
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
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: job,
    })
      .done(function(data){
        this.setState({data: data});
      }.bind(this))
      .fail(function(xhr, status, err) {
        this.setState({data: jobs});
        console.error(this.props.url, status, err.toString());
      }.bind(this));
  },

    // Called automatically by React after a component is rendered for the first time
    componentDidMount: function() {
        this.loadJobsFromServer();
        setInterval(this.loadJobsFromServer, POLL_INTERVAL);
    },


    removeVolunteer: function(e) {
      //send in two pieces of data
      /*
        e = {
          jobToRemove: ''
          name: ''
        }
      */
      var newURL = API_URL + '/volunteer'
      $.ajax({
        url: newURL,
        dataType: 'json',
        type: 'DELETE',
        data: e,
      })
        .done(function(data){
        }.bind(this))
        .fail(function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this));
    },

  render: function() {
    return (
      <div className="adminBox">
        <h1>Volunteering Jobs</h1>
        <JobList data={this.state.data} removeVolunteer={this.removeVolunteer} />
        <JobForm onJobSubmit={this.handleJobSubmit} />
      </div>
    );
  }
});
