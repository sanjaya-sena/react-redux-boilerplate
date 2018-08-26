import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from "../actions/postActions";

class Posts extends React.Component {

    componentWillMount(){
        this.props.fetchPosts();
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.newItem) {
            this.props.posts.unshift(nextProps.newItem);
        }
    };

    render(){
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        ));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        );
    };
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newItem: PropTypes.object
};

const mapStateToProps = state => ({
    posts: state.posts.items,
    newItem: state.posts.item
});

export default connect(mapStateToProps,{ fetchPosts })(Posts);