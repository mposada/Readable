import React from "react";
import serializeForm from "form-serialize";

const PostForm = props => {
    const handleSubmit = event => {
        event.preventDefault();

        const values = serializeForm(event.target, { hash: true });
        if (props.onSubmitPost) {
            props.onSubmitPost(values);
        }
    };

    return (
        <div id="modal" className="modal">
            <div className="modal-content">
                <span
                    className="close"
                    onClick={() => props.onToggleModalForm()}
                >
                    &times;
                </span>
                <h2 className="modal-title">Create a new Post</h2>
                <form onSubmit={handleSubmit} method="post">
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-control"
                            defaultValue={props.post ? props.post.category : ""}
                            required
                        >
                            <option value="">Select</option>
                            <option value="react">React</option>
                            <option value="redux">Redux</option>
                            <option value="udacity">Udacity</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            className="form-control"
                            defaultValue={props.post ? props.post.author : ""}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            defaultValue={props.post ? props.post.title : ""}
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
                            defaultValue={props.post ? props.post.body : ""}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button className="btn btn-cancel">Cancel</button>
                        <button className="btn btn-save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
