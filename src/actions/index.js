import { getAllPosts } from "../utils/ReadableAPI";

export const REQUEST_ALL_POSTS = "REQUEST_ALL_POSTS";
export const RECEIVE_ALL_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";

export const FILTER_POSTS_BY_TITLE = "FILTER_POSTS_BY_TITLE";
export const FILTER_POSTS_SCORE = "FILTER_POSTS_SCORE";
export const FILTER_POSTS_DATE = "FILTER_POSTS_DATE";

// region synchronous-actions

export function filterPostsBytitle(filter) {
    return {
        type: FILTER_POSTS_BY_TITLE,
        filter
    };
}

export function filterPostsByScore(filter) {
    return {
        type: FILTER_POSTS_SCORE,
        filter
    };
}

export function filterPostsByDate(filter) {
    return {
        type: FILTER_POSTS_DATE,
        filter
    };
}

function requestAllPosts() {
    return {
        type: REQUEST_ALL_POSTS
    };
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
}

/*function requestPosts(category) {
    return {
        type: REQUEST_ALL_POSTS,
        category
    };
}*/

function receivePosts(posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts: posts,
        receivedAt: Date.now()
    };
}

// endregion synchronous-actions

// region asynchronous-actions

export function fetchAllPosts() {
    return dispatch => {
        dispatch(requestAllPosts());
        getAllPosts().then(posts => {
            dispatch(receivePosts(posts));
        });
    };
}

// endregion asynchronous-actions

// helpers

function shouldFetchPosts(state, category) {
    const posts = state.selectedCategory[category];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return true;
    }
}

export function fetchPostsIfNeeded(category) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), category)) {
            return dispatch(fetchAllPosts(category));
        } else {
            return Promise.resolve();
        }
    };
}
