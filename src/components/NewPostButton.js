import React from "react";

const NewPostButton = props => {
    return (
        <div
            className="action-button"
            onClick={() => props.onToggleModalForm()}
        >
            <a className="btn-floating red">
                <i className="fa fa-plus" />
            </a>
        </div>
    );
};

export default NewPostButton;
