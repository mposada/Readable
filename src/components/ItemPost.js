import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const ItemPost = props => {
    const day = moment(props.post.timestamp).fromNow();
    let icon;
    if (props.post.voteScore >= 0) {
        icon = <i className="fa fa-thumbs-o-up" />;
    } else {
        icon = <i className="fa fa-thumbs-o-down" />;
    }
    return (
        <article className="post">
            <Link to={`post/${props.post.category}/${props.post.id}`}>
                <div className="card-post-header">
                    <h3>{props.post.title}</h3>
                    <span>{day}</span>
                </div>
                <p>{props.post.body.substring(0, 100) + "..."}</p>
                <div className="card-post-footer">
                    <div className="likes">
                        {icon}
                        {" " + props.post.voteScore}
                    </div>
                    <div className="comments">
                        <i className="fa fa-comment" /> 234
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default ItemPost;
