import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllPosts, filterPostsBytitle, addPost } from "../actions";
import escapeRegExp from "escape-string-regexp";
import uuidv4 from "uuid/v4";
import Header from "./Header";
import ItemPost from "./ItemPost";
import PostForm from "./PostForm";
import NewPostButton from "./NewPostButton";
import Navigation from "./Navigation";
import Loading from "./Loading";

import { createPost } from "../utils/ReadableAPI";

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalFormActive: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllPosts());
    }

    toggleModalForm() {
        this.setState({
            modalFormActive: !this.state.modalFormActive
        });
    }

    filterPosts(filter) {
        const { dispatch } = this.props;
        dispatch(filterPostsBytitle(filter));
    }

    createPost(data) {
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

    render() {
        /**
         * match: return the current url route
         */
        const { posts, isFetching, filter, selectedCategory } = this.props;

        // check what posts should we show
        let showingPosts;
        if (filter) {
            const matchList = new RegExp(escapeRegExp(filter), "i");
            showingPosts = posts.filter(post => matchList.test(post.title));
        } else {
            // show all
            showingPosts = posts;
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
                            showingPosts.map(post => (
                                <ItemPost key={post.id} post={post} />
                            ))}
                    </section>
                </section>

                {this.state.modalFormActive && (
                    <PostForm
                        onToggleModalForm={this.toggleModalForm.bind(this)}
                        onCreatePost={this.createPost.bind(this)}
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
    const { posts: postsByCategory, isFetching } = state.app;
    const { filteredPosts: filter } = state;
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

    return { isFetching, posts, filter, selectedCategory };
}

export default connect(mapStateToProps)(Posts);
