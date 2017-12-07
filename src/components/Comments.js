import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { createComment, requestUpdateComment } from "../utils/ReadableAPI";
import {
    requestDeleteComment,
    addComment,
    updateComment,
    voteComment
} from "../actions";

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCommentForm: false,
            comment: {}
        };
    }

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

    editComment(comment) {
        this.setState({
            showCommentForm: true,
            comment
        });
    }

    _updateComment(data) {
        const { dispatch } = this.props;

        const body = {
            timestamp: Date.now(),
            ...data
        };

        requestUpdateComment(this.state.comment, body).then(response => {
            dispatch(updateComment(response));
            this.setState({
                showCommentForm: false
            });
        });
    }

    _voteComment(comment, value) {
        const { dispatch } = this.props;
        dispatch(voteComment(value, comment));
    }

    render() {
        const { comments, dateFilter, voteScoreFilter } = this.props;

        // check what posts should we show
        let showingComments = comments;

        if (dateFilter) {
            showingComments = comments.sort((a, b) => {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                if (dateFilter === "LATEST") {
                    return dateB - dateA;
                } else if (dateFilter === "OLDEST") {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
        }

        if (voteScoreFilter) {
            showingComments = showingComments.sort((a, b) => {
                if (voteScoreFilter === "HIGH") {
                    return b.voteScore - a.voteScore;
                } else if (voteScoreFilter === "LOWER") {
                    return a.voteScore - b.voteScore;
                } else {
                    return -1;
                }
            });
        }

        return (
            <div className="comments">
                <CommentForm onSubmitComment={this._createComment.bind(this)} />
                {showingComments.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onVoteComment={this._voteComment.bind(this)}
                        onEditComment={this.editComment.bind(this)}
                        onDeleteComment={this.deleteComment.bind(this)}
                    />
                ))}

                {this.state.showCommentForm && (
                    <div id="modal" className="modal">
                        <div className="modal-content">
                            <span
                                className="close"
                                onClick={() =>
                                    this.setState({
                                        showCommentForm: false,
                                        comment: {}
                                    })
                                }
                            >
                                &times;
                            </span>
                            <CommentForm
                                comment={this.state.comment}
                                onSubmitComment={this._updateComment.bind(this)}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Comments.PropTypes = {
    post: PropTypes.object.isRequired
};

function mapStateToPorps(state, ownProps) {
    const { filteredPosts: { score: voteScoreFilter, dateFilter } } = state;
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
        voteScoreFilter,
        dateFilter,
        comments,
        parentId
    };
}

export default connect(mapStateToPorps)(Comments);
