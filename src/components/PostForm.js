import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from "../actions/postActions";

class PostForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body
        };

        this.props.createPost(post);
    }

    render(){
        return (
            <div>
                <h1>Add Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" onChange={this.onChange} value={this.state.title} />
                    </div>
                    <div>
                        <label htmlFor="body">Body</label>
                        <input type="text" name="body" onChange={this.onChange} value={this.state.body} />
                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    };
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect( mapStateToProps,{ createPost })(PostForm);