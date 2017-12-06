import React from "react";

const Comment = props => {
    const { comment } = props;
    return (
        <div className="comment">
            <div className="comment-header">
                <h4>{comment.author}</h4>
                <div>
                    <a onClick={() => alert("editar")} className="btn-edit">
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
                    <a onClick={() => alert("votar")}>
                        <i className="fa fa-heart" /> {comment.voteScore}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Comment;
