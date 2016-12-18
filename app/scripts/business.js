import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

import styles from '../css/base.css';

module.exports = React.createClass({

  // rawMarkup function for the business description
   rawMarkup: function() {
    var md = new Remarkable({html: true});
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  // Render method for this React class
  render: function() {
    return (
      <div className="business">
        <h2 className={styles.businessTitle}>
          {this.props.owner_name}
        </h2>
        <span className={styles.italicizeElements} dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
