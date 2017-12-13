import { combineReducers } from "redux";
import {
    REQUEST_ALL_POSTS,
    RECEIVE_ALL_POSTS,
    RECEIVE_COMMENTS,
    FILTER_POSTS_BY_TITLE,
    FILTER_POSTS_SCORE,
    FILTER_POSTS_DATE,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT
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
        case RECEIVE_COMMENTS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    ...action.comments
                }
            };
        case ADD_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.category]: postNewState(state, action)
                }
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.category]: postNewState(state, action)
                }
            };
        case DELETE_POST:
            let newState;
            if (state.posts[action.post.category].constructor === Array) {
                const postIndex = state.posts[action.post.category].findIndex(
                    item => item.id === action.post.id
                );

                newState = state.posts[action.post.category].splice(
                    postIndex,
                    1
                );
            } else {
                newState = state.posts[action.post.category] = {};
            }
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.category]: newState
                }
            };
        case VOTE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.category]: postNewState(state, action)
                }
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: state.comments[
                        action.comment.parentId
                    ].filter(comment => comment.id != action.comment.id)
                }
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: commentNewState(state, action)
                }
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: commentNewState(state, action)
                }
            };
        case VOTE_COMMENT:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.comment.parentId]: commentNewState(state, action)
                }
            };
        default:
            return state;
    }
}

function postNewState(state, action) {
    if (state.posts[action.post.category] !== undefined) {
        if (state.posts[action.post.category].constructor === Array) {
            const postIndex = state.posts[action.post.category].findIndex(
                item => item.id === action.post.id
            );

            if (postIndex >= 0) {
                state.posts[action.post.category].splice(postIndex, 1);
            }

            return state.posts[action.post.category].concat(action.post);
        } else {
            if (state.posts[action.post.category].id === action.post.id) {
                return action.post;
            }
            return [state.posts[action.post.category]].concat(action.post);
        }
    } else {
        return action.post;
    }
}

function commentNewState(state, action) {
    if (state.comments[action.comment.parentId] !== undefined) {
        if (state.comments[action.comment.parentId].constructor === Array) {
            const commentIndex = state.comments[
                action.comment.parentId
            ].findIndex(item => item.id === action.comment.id);

            if (commentIndex >= 0) {
                state.comments[action.comment.parentId].splice(commentIndex, 1);
            }

            return state.comments[action.comment.parentId].concat(
                action.comment
            );
        } else {
            if (
                state.comments[action.comment.parentId].id === action.comment.id
            ) {
                return action.comment;
            }
            return [state.comments[action.comment.parentId]].concat(
                action.comment
            );
        }
    } else {
        return action.comment;
    }
}

const rootReducer = combineReducers({
    filteredPosts,
    app
});

export default rootReducer;
