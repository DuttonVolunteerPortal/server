import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Volunteer from './adminVolunteer.js'

import styles from '../css/base.css';

module.exports = React.createClass({

  render: function() {
    var volunteerNodes = this.props.data.map(function(volunteer) {
      return (
        <Volunteer name={volunteer}/>
      );
    });
    return (
      <div className={styles.divContainer}>
      	<h3>Volunteers</h3>
        {volunteerNodes}
      </div>
    );
  }
});