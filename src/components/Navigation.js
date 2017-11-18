import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Navigation extends Component {
    render() {
        const { selectedCategory } = this.props;

        return (
            <aside className="menu">
                <div className="column-container">
                    <div className="app-title">My Reads</div>
                    <nav>
                        <dl className="category-list">
                            <dt className="category-title">Categories</dt>
                            <dd
                                className={
                                    "menu-item " +
                                    (selectedCategory === "All" ? "active" : "")
                                }
                            >
                                <Link to="/">
                                    <i className="fa fa-filter" /> All
                                </Link>
                            </dd>
                            <dd
                                className={
                                    "menu-item " +
                                    (selectedCategory === "react"
                                        ? "active"
                                        : "")
                                }
                            >
                                <Link to="/react">
                                    <i className="fa fa-folder-open" /> React
                                </Link>
                            </dd>
                            <dd
                                className={
                                    "menu-item " +
                                    (selectedCategory === "redux"
                                        ? "active"
                                        : "")
                                }
                            >
                                <Link to="/redux">
                                    <i className="fa fa-folder-open" /> Redux
                                </Link>
                            </dd>
                            <dd
                                className={
                                    "menu-item " +
                                    (selectedCategory === "udacity"
                                        ? "active"
                                        : "")
                                }
                            >
                                <Link to="/udacity">
                                    <i className="fa fa-folder-open" /> Udacity
                                </Link>
                            </dd>
                            <dt className="category-title">Filter</dt>
                            <dd class="menu-item">
                                <a href="#" class="active">
                                    <i class="fa fa-sort-up" /> Major
                                </a>{" "}
                                /
                                <a href="#">
                                    <i class="fa fa-sort-desc" /> Minor
                                </a>{" "}
                                Vote
                            </dd>
                            <dd class="menu-item">
                                <a href="#" class="active">
                                    <i class="fa fa-sort-up" /> Latest
                                </a>{" "}
                                /
                                <a href="#">
                                    <i class="fa fa-sort-desc" /> Oldest
                                </a>
                            </dd>
                        </dl>
                    </nav>
                </div>
            </aside>
        );
    }
}

Navigation.PropTypes = {
    selectedCategory: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { selectedCategory } = ownProps;
    return {
        selectedCategory
    };
}

export default connect(mapStateToProps)(Navigation);
