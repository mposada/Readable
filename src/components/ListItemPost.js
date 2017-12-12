/**
 * post list item, of the main page list
 */

import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const ListItemPost = props => {
    const { post, comments } = props;
    const countComments = comments ? comments.length : 0;
    const day = moment(post.timestamp).fromNow();
    return (
        <article className="post">
            <div className="card-post-header">
                <span>{day}</span>
                <div>
                    <Link
                        to={`${post.category}/${post.id}`}
                        className="btn-edit"
                    >
                        <i className="fa fa-eye" />
                    </Link>

                    <a
                        onClick={() => props.onToggleModalForm(post)}
                        className="btn-edit"
                    >
                        <i className="fa fa-pencil" />
                    </a>

                    <a onClick={() => props.onDeletePost(post)}>
                        <i className="fa fa-trash" />
                    </a>
                </div>
            </div>
            <p>
                by <i>{post.author + " - "}</i>
                <b>{post.title}</b>
            </p>
            <p>{post.body}</p>
            <div className="card-post-footer">
                <div className="likes">
                    <a onClick={() => props.onVotePost("upVote", post)}>
                        <i className="fa fa-thumbs-o-up" />
                    </a>
                    {" " + post.voteScore + " "}
                    <a onClick={() => props.onVotePost("downVote", post)}>
                        <i className="fa fa-thumbs-o-down grey" />
                    </a>
                </div>
                <div className="comments">
                    <i className="fa fa-comment" /> {countComments}
                </div>
            </div>
        </article>
    );
};

export default ListItemPost;
