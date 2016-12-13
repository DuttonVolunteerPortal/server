import React from 'react';
import $ from 'jquery';


module.exports = React.createClass({
  getInitialState: function() {
    return {jobToExport: '', volunteer_description: ''};
  },
  handleSpecificJobExport: function(e) {
    this.setState({jobToExport: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var jobToExport = this.state.jobToExport.trim();
    if (!jobToExport) {
      return;
    }
    // TODO: send request to the server
    this.props.onJobSubmit({jobToExport: jobToExport});
    this.setState({jobToExport: ''});
  },
  render: function() {
    return (
      <div>
      <h1>Get Volunteers by Job</h1>
      <form className="exportForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Job Name"
          value={this.state.jobToExport}
          onChange={this.handleSpecificJobExport}
        />
        <input type="submit" value="Export" />
      </form>
      </div>
    );
  }
});
