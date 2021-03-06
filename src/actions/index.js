import {
    getAllPosts,
    getPost,
    getComments,
    updatePost,
    deletePost,
    votePost,
    deleteComment,
    requestVoteComment
} from "../utils/ReadableAPI";

import {
    REQUEST_ALL_POSTS,
    RECEIVE_ALL_POSTS,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    VOTE_POST,
    RECEIVE_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT,
    FILTER_POSTS_BY_TITLE,
    FILTER_POSTS_SCORE,
    FILTER_POSTS_DATE
} from "./actionNames";

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

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}

export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    };
}

function removeComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    };
}

function changeCommentVote(comment) {
    return {
        type: VOTE_COMMENT,
        comment
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
                    return getComments(post.id).then(comments => {
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

// is better like this ? , or to make it like the create post action ?
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

export function requestDeleteComment(id) {
    return dispatch => {
        deleteComment(id).then(response => dispatch(removeComment(response)));
    };
}

export function voteComment(vote, comment) {
    return dispatch => {
        requestVoteComment(vote, comment).then(response =>
            dispatch(changeCommentVote(response))
        );
    };
}

// endregion asynchronous-actions
