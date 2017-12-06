import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { createComment } from "../utils/ReadableAPI";
import { requestDeleteComment, addComment } from "../actions";

class Comments extends Component {
    deleteComment(comment) {
        const { dispatch } = this.props;
        dispatch(requestDeleteComment(comment.id));
    }

    _createComment(data) {
        const { parentId, dispatch } = this.props;

        const body = {
            id: uuidv4(),
            timestamp: Date.now(),
            parentId,
            ...data
        };

        createComment(body).then(comment => dispatch(addComment(comment)));
    }

    render() {
        const { comments } = this.props;
        return (
            <div className="comments">
                <CommentForm onSubmitComment={this._createComment.bind(this)} />
                {comments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onDeleteComment={this.deleteComment.bind(this)}
                    />
                ))}
            </div>
        );
    }
}

Comments.PropTypes = {
    post: PropTypes.object.isRequired
};

function mapStateToPorps(state, ownProps) {
    const { comments: postComments } = state.app;
    const { post } = ownProps;
    const parentId = post.id;

    let comments = [];

    if (postComments !== undefined) {
        if (
            Object.keys(post).length > 0 &&
            Object.keys(postComments).length > 0
        ) {
            if (post.id in postComments) {
                comments =
                    postComments[post.id].constructor === Array
                        ? postComments[post.id]
                        : [postComments[post.id]];
            }
        }
    }

    return {
        comments,
        parentId
    };
}

export default connect(mapStateToPorps)(Comments);
