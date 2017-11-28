/**
 * Post Detail page, show all the information relevant to a single post
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPost } from "../actions";
import Navigation from "./Navigation";
import Header from "./Header";
import Post from "./Post";

import Loading from "./Loading";

class PostDetail extends Component {
    componentDidMount() {
        const { dispatch, id, post } = this.props;
        if (Object.keys(post).length === 0) {
            dispatch(fetchPost(id));
        }
    }

    render() {
        const { post, isFetching } = this.props;
        return (
            <section className="app">
                <Navigation selectedCategory={post.category} />
                <section className="content">
                    <Header selectedCategory="Post Detail" />
                    <section className="posts-container">
                        {(isFetching && <Loading />) || <Post post={post} />}
                    </section>
                </section>
            </section>
        );
    }
}

PostDetail.PropTypes = {
    post: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    const { posts: postsByCategory, isFetching } = state.app;
    const { match: { params: { category, id } } } = ownProps;

    let post = {};
    /*
    * if post is different from undefined let's use the data stored in the state
    */
    if (postsByCategory[category]) {
        if (postsByCategory[category].constructor === Array) {
            post = postsByCategory[category].find(item => item.id === id);
        } else {
            post = postsByCategory[category];
        }
    }

    return {
        id,
        post,
        isFetching
    };
}

export default connect(mapStateToProps)(PostDetail);
