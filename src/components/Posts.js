import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllPosts } from "../actions";
import Header from "./Header";
import ItemPost from "./ItemPost";
import NewPostButton from "./NewPostButton";
import Navigation from "./Navigation";

class Posts extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllPosts());
    }

    render() {
        console.log(this.props);
        return (
            <div className="app">
                <Navigation />
                <section className="content">
                    <Header />
                    <section className="posts-container">
                        <ItemPost />
                    </section>
                </section>

                <NewPostButton />
            </div>
        );
    }
}

Posts.PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { posts, isFetching } = state;
    return { isFetching, posts };
}

export default connect(mapStateToProps)(Posts);
