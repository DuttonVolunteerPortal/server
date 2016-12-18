import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import styles from '../css/base.css';

module.exports = React.createClass({

  // removeVolunteer method calls props removeVolunteer to remove volunteer from a job
  removeVolunteer: function() {
    var data = {
      jobToRemove: "",
      name: ""
    };
    data.name = this.props.name;
    this.props.removeVolunteer(data)
  },

  // Render method for this React class
  render: function() {
    return (
      <div className="volunteer">
        <form className={styles.removeVolunteer} onSubmit={this.removeVolunteer}>
          <p className={styles.volunteerNode}>{this.props.name}</p>
          <input className={styles.removeButton} type="submit" value="remove"/>
        </form>
      </div>
    );
  }
});
