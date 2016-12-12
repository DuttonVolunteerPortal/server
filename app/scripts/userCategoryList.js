import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import JobCategory from './userJobCategory';

module.exports = React.createClass({
    
	render: function() {
        var jobNodes = this.props.data.map(function(job) {
            return (
                <JobCategory jobname={job.title}>
                    {job.title}
                </JobCategory>
            );
        });
        return (
            <div className="categoryList">
                {jobNodes}
            </div>
        );
    }
});