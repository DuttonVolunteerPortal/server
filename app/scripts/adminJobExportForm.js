import React from 'react';
import $ from 'jquery';
import {API_EXPORT} from './global';


module.exports = React.createClass({
  getInitialState: function() {

    return {jobToExport: '', volunteer_description: ''};
  },
  //get job titles from server
  // loadJobTitlesFromServer: function() {
  //   $.ajax({
  //     url: '/api/jobtitles',
  //     dataType: 'json',
  //     cache: false,
  //   })
  //   .done(function(result){
  //     console.log(result);
  //     this.setState({jobTitles: result});
  //
  //
  //
  //   }.bind(this))
  //   .fail(function(xhr, status, errorThrown) {
  //     console.error(this.props.url, status, err.toString());
  //   }.bind(this));
  // },
  handleSpecificJobExport: function(e) {
    this.setState({jobToExport: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var jobToExport = this.state.jobToExport.trim();
    if (!jobToExport) {
      return;
    }
    /*This thread is where I found window.location.
    http://stackoverflow.com/questions/20830309/download-file-using-an-ajax-request*/
    window.location =  '/api/export/specificJob' + "/" + jobToExport;
    this.setState({jobToExport: ''});
  },
  render: function() {

    //Some code for dynamically updating the menu taken from here:  http://www.javascriptkit.com/javatutors/selectcontent.shtml
    var jobMenu = document.getElementById("jobmenu");
    console.log(this.props.data);//logging output for debugging
    console.log("going to check if jobmenu needs clearing")
    if (jobMenu != null) {
      jobMenu.length = 0;
    }



    this.props.data.map(function(volunteerJob) {
      console.log("inside map");
      var option = document.createElement("option");
      option.value = volunteerJob.title;
      option.text = volunteerJob.title;
      jobMenu.add(option, null);
      return;
    });



    return (
      <div>
      <h1>Get Volunteers by Job</h1>
      <form className="JobExportForm" name="JobExportForm" id="JobExportForm" onSubmit={this.handleSubmit}>
      <select id="jobmenu">

      </select>
      <input type="submit" value="Export" />
      </form>
      </div>
    );
  }
});
