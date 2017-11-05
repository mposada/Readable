import React, { Component } from "react";

class ItemPost extends Component {
    render() {
        return (
            <article className="post">
                <div className="card-post-header">
                    <h3>Titulo</h3>
                    <span>6 min</span>
                </div>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Minus ducimus perspiciatis alias accusantium saepe excepturi
                    vitae porre...
                </p>
                <div className="card-post-footer">
                    <div className="likes">
                        <i className="fa fa-heart" /> 13
                    </div>
                    <div className="comments">
                        <i className="fa fa-comment" /> 234
                    </div>
                </div>
            </article>
        );
    }
}

export default ItemPost;
