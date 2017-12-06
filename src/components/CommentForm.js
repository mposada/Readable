import React from "react";
import serializeForm from "form-serialize";

const CommentForm = props => {
    const handleSubmit = event => {
        event.preventDefault();

        const values = serializeForm(event.target, { hash: true });
        if (props.onSubmitComment) {
            props.onSubmitComment(values);
        }

        this._author.value = "";
        this._body.value = "";
    };

    return (
        <div className="add-comment">
            <h2 className="modal-title">Add a Comment</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label>Name or Nickname</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="form-control"
                        ref={input => (this._author = input)}
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
                        ref={textarea => (this._body = textarea)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button className="btn btn-cancel">Cancel</button>
                    <button className="btn btn-save">Save</button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
