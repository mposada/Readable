/**
 * Main page of the application, list all the posts of all categories
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    fetchAllPosts,
    filterPostsBytitle,
    addPost,
    vote,
    requestUpdatePost,
    requestDeletePost
} from "../actions";
import escapeRegExp from "escape-string-regexp";
import uuidv4 from "uuid/v4";
import Header from "./Header";
import ListItemPost from "./ListItemPost";
import PostForm from "./PostForm";
import NewPostButton from "./NewPostButton";
import Navigation from "./Navigation";
import Loading from "./Loading";

import { createPost } from "../utils/ReadableAPI";

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalFormActive: false,
            post: {}
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllPosts());
    }

    toggleModalForm(post) {
        this.setState({
            modalFormActive: !this.state.modalFormActive,
            post
        });
    }

    filterPosts(filter) {
        const { dispatch } = this.props;
        dispatch(filterPostsBytitle(filter));
    }

    submitForm(data) {
        if (this.state.post) {
            const { dispatch } = this.props;
            const { post: { id } } = this.state;
            dispatch(requestUpdatePost(id, data));
            this.setState({
                modalFormActive: false
            });
        } else {
            const body = {
                id: uuidv4(),
                timestamp: Date.now(),
                ...data
            };

            // go on...
            createPost(body).then(response => {
                this.props.dispatch(addPost(response));
                this.setState({
                    modalFormActive: false
                });
            });
        }
    }

    deletePost(post) {
        const { dispatch } = this.props;
        dispatch(requestDeletePost(post.id));
    }

    votePost(value, post) {
        const { dispatch } = this.props;
        dispatch(vote(value, post));
    }

    render() {
        /**
         * match: return the current url route
         */
        const {
            posts,
            isFetching,
            titleFilter,
            voteScoreFilter,
            dateFilter,
            selectedCategory,
            comments
        } = this.props;

        // check what posts should we show
        let showingPosts = posts;

        if (dateFilter) {
            showingPosts = posts.sort((a, b) => {
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                if (dateFilter === "LATEST") {
                    return dateB - dateA;
                } else if (dateFilter === "OLDEST") {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
        }

        if (voteScoreFilter) {
            showingPosts = showingPosts.sort((a, b) => {
                if (voteScoreFilter === "HIGH") {
                    return b.voteScore - a.voteScore;
                } else if (voteScoreFilter === "LOWER") {
                    return a.voteScore - b.voteScore;
                } else {
                    return -1;
                }
            });
        }

        if (titleFilter) {
            const matchList = new RegExp(escapeRegExp(titleFilter), "i");
            showingPosts = showingPosts.filter(post =>
                matchList.test(post.title)
            );
        }

        return (
            <div className="app">
                <Navigation selectedCategory={selectedCategory} />
                <section className="content">
                    <Header
                        selectedCategory={selectedCategory}
                        posts={posts}
                        onFilterPosts={this.filterPosts.bind(this)}
                    />
                    <section className="posts-container">
                        {(isFetching && <Loading />) ||
                            showingPosts.map(
                                post =>
                                    Object.keys(post).length > 0 && (
                                        <ListItemPost
                                            key={post.id}
                                            post={post}
                                            comments={
                                                comments
                                                    ? comments[post.id]
                                                    : ""
                                            }
                                            onVotePost={this.votePost.bind(
                                                this
                                            )}
                                            onToggleModalForm={this.toggleModalForm.bind(
                                                this
                                            )}
                                            onDeletePost={this.deletePost.bind(
                                                this
                                            )}
                                        />
                                    )
                            )}
                    </section>
                </section>

                {this.state.modalFormActive && (
                    <PostForm
                        post={this.state.post}
                        onToggleModalForm={this.toggleModalForm.bind(this)}
                        onSubmitPost={this.submitForm.bind(this)}
                    />
                )}

                <NewPostButton
                    onToggleModalForm={this.toggleModalForm.bind(this)}
                />
            </div>
        );
    }
}

Posts.PropTypes = {
    match: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const { posts: postsByCategory, comments, isFetching } = state.app;
    const {
        filteredPosts: {
            filter: titleFilter,
            score: voteScoreFilter,
            dateFilter
        }
    } = state;
    const { match } = ownProps;

    let selectedCategory = match.path.slice(1);
    if (selectedCategory === "") {
        selectedCategory = "All";
    }

    let posts;
    if (match.path === "/") {
        posts = Object.keys(postsByCategory).reduce(
            (prev, next, index) => prev.concat(postsByCategory[next]),
            []
        );
    } else if (postsByCategory[selectedCategory]) {
        // shorthand way
        // posts = postsByCategory[selectedCategory].constructor === Array ? postsByCategory[selectedCategory] : [postsByCategory[selectedCategory]];
        if (postsByCategory[selectedCategory].constructor === Array) {
            posts = postsByCategory[selectedCategory];
        } else {
            posts = [postsByCategory[selectedCategory]];
        }
    } else {
        posts = [];
    }

    return {
        isFetching,
        posts,
        titleFilter,
        voteScoreFilter,
        dateFilter,
        selectedCategory,
        comments
    };
}

export default connect(mapStateToProps)(Posts);
