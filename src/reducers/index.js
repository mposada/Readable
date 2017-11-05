import { combineReducers } from "redux";
import {
    SELECT_CATEGORY,
    REQUEST_ALL_POSTS,
    RECEIVE_ALL_POSTS
} from "../actions";

/*const stateShape = {
    selectedCategory: "react",
    isFetching: false,
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

function selectedCategory(state = "react", action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.selectedCategory;
        default:
            return state;
    }
}

function posts(
    state = { selectedCategory: "react", isFetching: false, posts: [] },
    action
) {
    switch (state.type) {
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedCategory,
    posts
});

export default rootReducer;
