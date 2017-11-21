import { combineReducers } from "redux";
import {
    REQUEST_ALL_POSTS,
    RECEIVE_ALL_POSTS,
    FILTER_POSTS_BY_TITLE,
    FILTER_POSTS_SCORE,
    FILTER_POSTS_DATE,
    ADD_POST
} from "../actions";

/*const stateShape = {
    selectedCategory: "react",
    isFetching: false,
    filter: "",
    posts: {
        react: {
            isFetching: false,
            lastUpdated: null,
            items: [
                {
                    id: "8xf0y6ziyjabvozdd253nd",
                    timestamp: 1467166872634,
                    title: "Udacity is the best place to learn React",
                    body: "Everyone says so after all.",
                    author: "thingtwo",
                    category: "react",
                    voteScore: 6,
                    deleted: false
                }
            ]
        },
        redux: {
            isFetching: false,
            lastUpdated: null,
            items: [
                {
                    id: "6ni6ok3ym7mf1p33lnez",
                    timestamp: 1468479767190,
                    title: "Learn Redux in 10 minutes!",
                    body:
                        "Just kidding. It takes more than 10 minutes to learn technology.",
                    author: "thingone",
                    category: "redux",
                    voteScore: -5,
                    deleted: false
                }
            ]
        },
        udacity: {
            isFetching: false,
            items: []
        }
    },
    comments: {
        "8xf0y6ziyjabvozdd253nd": {
            isFetching: false,
            lastUpdated: null,
            items: [
                {
                    id: "894tuq4ut84ut8v4t8wun89g",
                    parentId: "8xf0y6ziyjabvozdd253nd",
                    timestamp: 1468166872634,
                    body: "Hi there! I am a COMMENT.",
                    author: "thingtwo",
                    voteScore: 6,
                    deleted: false,
                    parentDeleted: false
                },
                {
                    id: "8tu4bsun805n8un48ve89",
                    parentId: "8xf0y6ziyjabvozdd253nd",
                    timestamp: 1469479767190,
                    body: "Comments. Are. Cool.",
                    author: "thingone",
                    voteScore: -5,
                    deleted: false,
                    parentDeleted: false
                }
            ]
        }
    }
};*/

function filteredPosts(
    state = {
        filter: "",
        score: "",
        dateFilter: "LATEST"
    },
    action
) {
    switch (action.type) {
        case FILTER_POSTS_BY_TITLE:
            return {
                ...state,
                filter: action.filter
            };
        case FILTER_POSTS_SCORE:
            return {
                ...state,
                score: action.filter
            };
        case FILTER_POSTS_DATE:
            return {
                ...state,
                dateFilter: action.filter
            };
        default:
            return state;
    }
}

function app(
    state = {
        isFetching: false,
        posts: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_ALL_POSTS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_ALL_POSTS:
            return {
                ...state,
                isFetching: false,
                posts: action.posts
            };
        case ADD_POST:
            let newState;
            if (state.posts[action.post.category] !== undefined) {
                if (state.posts[action.post.category].constructor === Array) {
                    newState = state.posts[action.post.category].concat(
                        action.post
                    );
                } else {
                    newState = [state.posts[action.post.category]].concat(
                        action.post
                    );
                }
            } else {
                newState = action.post;
            }
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.category]: newState
                }
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    filteredPosts,
    app
});

export default rootReducer;
