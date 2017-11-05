import React, { Component } from "react";

class NewPostButton extends Component {
    render() {
        return (
            <div className="action-button">
                <a className="btn-floating red">
                    <i className="fa fa-plus" />
                </a>
            </div>
        );
    }
}

export default NewPostButton;
