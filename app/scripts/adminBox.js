import React from 'react';
import $ from 'jquery';

import JobList from './adminVolunteerJobList.js';
import JobForm from './adminForm.js';
import BusinessList from './businessList.js';

import styles from '../css/base.css';

import {API_URL, API_URL2, POLL_INTERVAL} from './global';

module.exports = React.createClass({

  // Get the initial state of this React class
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
    var newURL = API_URL + '/' + e.jobToRemove + '/' + e.name;
    $.ajax({
      url: newURL,
      type: 'DELETE',
    })
      .done(function(data){
      }.bind(this))
      .fail(function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this));
  },

  // Render method for this React class
  render: function() {
    return (
      <div className={styles.adminBox}>
        <JobList data={this.state.data} removeVolunteer={this.removeVolunteer} />
        <JobForm onJobSubmit={this.handleJobSubmit} />
        <BusinessList />
      </div>
    );
  }
});
