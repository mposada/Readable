import {
    getAllPosts,
    getPost,
    getComments,
    updatePost,
    deletePost,
    votePost
} from "../utils/ReadableAPI";

export const REQUEST_ALL_POSTS = "REQUEST_ALL_POSTS";
export const RECEIVE_ALL_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE_POST = "VOTE_POST";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

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

function receivePosts(posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts: posts,
        receivedAt: Date.now()
    };
}

function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}

function receiveUpdatedPost(post) {
    return {
        type: UPDATE_POST,
        post
    };
}

function removePost(post) {
    return {
        type: DELETE_POST,
        post
    };
}

function changePostVote(post) {
    return {
        type: VOTE_POST,
        post
    };
}

// endregion synchronous-actions

// region asynchronous-actions

export function fetchAllPosts() {
    return dispatch => {
        dispatch(requestAllPosts());
        getAllPosts().then(posts => {
            dispatch(receivePosts(posts));
            // is ok to do this here ?
            Object.keys(posts)
                .reduce((prev, next, index) => prev.concat(posts[next]), [])
                .map(post => {
                    getComments(post.id).then(comments => {
                        dispatch(receiveComments(comments));
                    });
                });
        });
    };
}

export function fetchPost(id) {
    return dispatch => {
        dispatch(requestAllPosts());
        getPost(id).then(post => {
            getComments(id).then(comments => {
                dispatch(receivePosts(post));
                dispatch(receiveComments(comments));
            });
        });
    };

    //
}

export function requestUpdatePost(id, post) {
    return dispatch => {
        updatePost(id, post).then(response =>
            dispatch(receiveUpdatedPost(response))
        );
    };
}

export function requestDeletePost(id) {
    return dispatch => {
        deletePost(id).then(response => dispatch(removePost(response)));
    };
}

export function vote(vote, post) {
    return dispatch => {
        votePost(vote, post).then(response =>
            dispatch(changePostVote(response))
        );
    };
}

// endregion asynchronous-actions
