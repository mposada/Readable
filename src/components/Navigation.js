import React, { Component } from "react";

class Navigation extends Component {
    render() {
        return (
            <aside className="menu">
                <div className="column-container">
                    <div className="app-title">My Reads</div>
                    <nav>
                        <dl className="category-list">
                            <dt className="category-title">Categories</dt>
                            <dd className="menu-item">
                                <a href="">
                                    <i className="fa fa-filter" /> All
                                </a>
                            </dd>
                            <dd className="menu-item active">
                                <a href="">
                                    <i className="fa fa-folder-open" /> ReactJS
                                </a>
                            </dd>
                            <dd className="menu-item">
                                <a href="">
                                    <i className="fa fa-folder" /> Redux
                                </a>
                            </dd>
                            <dd className="menu-item">
                                <a href="">
                                    <i className="fa fa-folder" /> Udacity
                                </a>
                            </dd>
                            <dt className="category-title">Filter</dt>
                            <dd className="menu-item">Major / Minor Vote</dd>
                            <dd className="menu-item">Latest / Oldest</dd>
                        </dl>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Navigation;
