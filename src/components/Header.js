import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <header>
                <span className="selected-section">ReactJS</span>
                <div className="search-content">
                    <form className="search-form" action="">
                        <button className="search-button">
                            <i className="fa fa-search" />
                        </button>
                        <input
                            className="seacrh-input"
                            type="text"
                            placeholder="Search post"
                        />
                    </form>
                </div>
            </header>
        );
    }
}

export default Header;
