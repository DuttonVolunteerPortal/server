import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';
import $ from 'jquery';
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
  handleExport: function(e) {
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

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  // Handle submit for the CSV file export
  /*
  from user  arnaud576875: http://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript


  */
  handleEmail: function(e) {
    e.preventDefault();
    var jobToEmail = this.props.title.trim();
    console.log("Handling email");
    if (!jobToEmail) {
      return;
    }
    var url = '/api/email/specificJob/' + jobToEmail;
    let addresses = '';
    $.ajax({
      url: url,
      type: 'GET',
      cache: false,

    })
    .done(function(result){
      this.shouldComponentUpdate(0,0);
      this.setState({emailList: result});
      console.log(result);
      addresses = result;
      console.log(addresses);
      // window.open('mailto:test@test.edu');
      // window.open('mailto:' + result);
    }.bind(this))
    .fail(function(xhr, status, errorThrown) {
      console.error(this.props.url, status, err.toString());
    }.bind(this));

    // var mail = 'mailto:' + addresses;
    // console.log('mail:');
    // console.log(mail);
    var mail = 'mailto:' + this.state.emailList;
    console.log("mailto is below");
    console.log(mail);
    window.open(mail);
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
      <form className={styles.JobExportForm} onSubmit={this.handleExport}>
      <input type="submit" value="Export" />
      </form>
      <form className={styles.JobExportForm} onSubmit={this.handleEmail}>
      <input type="submit" value="Send Email"/>
      </form>


      </div>
    );
  }
});
