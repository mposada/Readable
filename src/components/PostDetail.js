import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import Header from "./Header";

class PostDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
    }

    render() {
        console.log(this.props);
        const { post } = this.props;
        return (
            <section className="app">
                <Navigation selectedCategory={post.category} />
                <section className="content">
                    <Header selectedCategory="Post Detail" />
                    <section className="posts-container">
                        <article className="post">
                            <div className="card-post-header">
                                <span>
                                    by <b>{post.author}</b>
                                </span>
                                <div>Aug 28</div>
                            </div>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </article>
                    </section>
                </section>
            </section>
        );
    }
}

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
    } else {
        // posts is undefined let's fetch the post we need
    }

    return {
        id,
        category,
        post
    };
}

export default connect(mapStateToProps)(PostDetail);
