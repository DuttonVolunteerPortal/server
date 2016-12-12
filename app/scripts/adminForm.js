import React from 'react';
import $ from 'jquery';


module.exports = React.createClass({
  getInitialState: function() {
    return {volunteer_job: '', volunteer_description: ''};
  },
  handleJobChange: function(e) {
    this.setState({volunteer_job: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({volunteer_description: e.target.value});
  },
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
  render: function() {
    return (
      <div>
      <h1>Create a New Job</h1>
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
        <input type="submit" value="Post" />
      </form>
      </div>
    );
  }
});