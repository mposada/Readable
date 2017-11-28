import React, { Component } from "react";

class Comments extends Component {
    render() {
        return (
            <div className="comments">
                <div className="add-comment">
                    <h2 className="modal-title">Add a Comment</h2>
                    <form action="/" method="post">
                        <div className="form-group">
                            <label>Name or Nickname</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="form-control"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Body</label>
                            <textarea
                                type="text"
                                id="body"
                                name="body"
                                className="form-control"
                                placeholder="Body"
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button className="btn btn-cancel">Cancel</button>
                            <button className="btn btn-save">Save</button>
                        </div>
                    </form>
                </div>
                <div className="comment">
                    <div className="comment-header">
                        <h4>Meghan Hebel</h4>
                        <div>
                            <a
                                onClick={() => alert("editar")}
                                className="btn-edit"
                            >
                                <i className="fa fa-pencil" /> Edit
                            </a>

                            <a onClick={() => alert("borrar")}>
                                <i className="fa fa-trash" /> Delete
                            </a>
                        </div>
                    </div>
                    <p>
                        The first time someone told me this, I completely
                        ignored it — only to come crawling back a week later to
                        tell them they were right, after I had to reformat all
                        of my HTML
                    </p>
                    <div className="card-post-footer">
                        <div className="likes">
                            <a onClick={() => alert("votar")}>
                                <i className="fa fa-heart" /> 13
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;
