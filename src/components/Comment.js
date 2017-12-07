import React from "react";

const Comment = props => {
    const { comment } = props;

    const votePost = value => {
        props.onVoteComment(comment, value);
    };

    return (
        <div className="comment">
            <div className="comment-header">
                <h4>{comment.author}</h4>
                <div>
                    <a
                        onClick={props.onEditComment.bind(this, props.comment)}
                        className="btn-edit"
                    >
                        <i className="fa fa-pencil" /> Edit
                    </a>

                    <a
                        onClick={props.onDeleteComment.bind(
                            this,
                            props.comment
                        )}
                    >
                        <i className="fa fa-trash" /> Delete
                    </a>
                </div>
            </div>
            <p>{comment.body}</p>
            <div className="card-post-footer">
                <div className="likes">
                    <a onClick={votePost.bind(this, "upVote")}>
                        <i className="fa fa-thumbs-o-up" />
                    </a>
                    {" " + comment.voteScore + " "}
                    <a onClick={votePost.bind(this, "downVote")}>
                        <i className="fa fa-thumbs-o-down grey" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Comment;
