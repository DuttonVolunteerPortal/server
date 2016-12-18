import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Business from './business.js';

import styles from '../css/base.css';

import {API_URL, API_URL2, POLL_INTERVAL} from './global';

module.exports = React.createClass({

  // Get the initial state of this React class
  getInitialState: function(){
    return {data: []};
  },

  // Use to AJAX to get jobs from the server
  loadBusinessesFromServer: function() {
      $.ajax({
          url: API_URL2,
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

  // Called automatically by React after a component is rendered for the first time
  componentDidMount: function() {
      this.loadBusinessesFromServer();
      setInterval(this.loadBusinessesFromServer, POLL_INTERVAL);
  },

  // Render method for this React class
  render: function() {
  var businessNodes = this.state.data.map(function(business) {
    return (
      <Business id={business.id} key={business.id} owner_name={business.owner_name} email={business.email}>
        {business.businessDescription}
      </Business>
    );
  });
  return (
    <div className={styles.businessList}>
      <h2 className={styles.ListHeader}>Business List</h2>
      {businessNodes}
    </div>
    );
  }
});