import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { requestUpdatePost, requestDeletePost, vote } from "../actions";
import PostForm from "./PostForm";
import Comments from "./Comments";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPostForm: false
        };
    }

    updatePost(data) {
        const { id, dispatch } = this.props;
        dispatch(requestUpdatePost(id, data));
        this.setState({
            showPostForm: false
        });
    }

    deletePost() {
        const { dispatch, id } = this.props;
        dispatch(requestDeletePost(id));
        window.location.href = "http://localhost:3000/";
    }

    votePost(value) {
        const { dispatch, post } = this.props;
        dispatch(vote(value, post));
    }

    render() {
        const { post } = this.props;
        const day = moment(post.timestamp).fromNow();
        return (
            <article className="post">
                <div className="card-post-header">
                    <span>{day}</span>
                    <span>
                        <h4>{post.title}</h4>
                    </span>
                    <div>
                        <a
                            onClick={() =>
                                this.setState({
                                    showPostForm: true
                                })
                            }
                            className="btn-edit"
                        >
                            <i className="fa fa-pencil" /> Edit
                        </a>

                        <a onClick={this.onDeletePost}>
                            <i className="fa fa-trash" /> Delete
                        </a>
                    </div>
                </div>
                <p>
                    by <b>{post.author}</b>
                </p>
                <p>{post.body}</p>
                <div className="card-post-footer">
                    <div className="likes">
                        <a onClick={this.votePost.bind(this, "upVote")}>
                            <i className="fa fa-thumbs-o-up" />
                        </a>
                        {" " + post.voteScore + " "}
                        <a onClick={this.votePost.bind(this, "downVote")}>
                            <i className="fa fa-thumbs-o-down grey" />
                        </a>
                    </div>
                </div>

                <Comments post={post} />

                {this.state.showPostForm && (
                    <PostForm
                        post={post}
                        onToggleModalForm={() =>
                            this.setState({
                                showPostForm: false
                            })
                        }
                        onSubmitPost={this.updatePost.bind(this)}
                    />
                )}
            </article>
        );
    }
}

Post.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

export default connect()(Post);
