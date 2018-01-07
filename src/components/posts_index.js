import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        if (_.size(this.props.posts) === 0) {
            return (
                <div>
                    Loading ... (Sorry, it takes some time to initially wake up the API server!)
                </div>
            );
        } else {
            return _.map(this.props.posts, post => {
                return (
                    <li className="list-group-item" key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </li>
                );
            })
        }
    }

    render() {
        return (
            <div>
                <div className="text-xs-right page-header">
                    <Link className="btn btn-primary" to="/posts/new">Add a Post</Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>    
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);