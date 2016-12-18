import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import {API_URL, POLL_INTERVAL} from './global';

module.exports = React.createClass({

    // Get the initial state of this React class
    getInitialState: function() {
        return {title: '', description: ''};
    },

    // Once the React class component did mount
    componentDidMount: function() {
        this.loadData();
    },

    // Once the React class component did update
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },

    // Load data for an individual job
    loadData: function() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(jobs) {
            this.setState(jobs[0]);
        }.bind(this));
    },

    // Handle when the title field changes
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },

    // Handle when the description field changes
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },

    // Allow for React Router
    contextTypes: {
        router: React.PropTypes.object
    },

    // AJAX call to server to update a job from the MongoDB
    handleUpdate: function() {
        var updatedJob = {
            title: this.state.title.trim(),
            description: this.state.description.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedJob)
        })
         .done(function(jobs){
             this.context.router.push('/');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },

    // AJAX call to server to delete a job from the MongoDB
    handleDelete: function() {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE'
        })
         .done(function(jobs){
             this.context.router.push('/');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },

    // Render method for this React class
    render: function() {
        return (
            <div>
                <form className="jobForm">
                    <h1>Job Edit - {this.state.id}</h1>
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <input
                        type="text"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});