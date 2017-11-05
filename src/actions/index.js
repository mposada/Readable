import * as ReadableAPI from "../utils/ReadableAPI";

export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const REQUEST_ALL_POSTS = "REQUEST_ALL_POSTS";
export const RECEIVE_ALL_POSTS = "RECEIVE_POSTS";

// region synchronous-actions

export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    };
}

function requestAllPosts() {
    return {
        type: REQUEST_ALL_POSTS
    };
}

/*function requestPosts(category) {
    return {
        type: REQUEST_ALL_POSTS,
        category
    };
}*/

function receivePosts(json) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

// endregion synchronous-actions

// region asynchronous-actions

export function fetchAllPosts() {
    return dispatch => {
        dispatch(requestAllPosts());
        ReadableAPI.getAllPosts(response => {
            const posts = response.reduce((posts, post) => {
                if (posts[post.category]) {
                    return {
                        ...posts,
                        [post.category]: [post].concat(posts[post.category])
                    };
                } else {
                    return {
                        ...posts,
                        [post.category]: post
                    };
                }
            }, {});
            dispatch(receivePosts(posts));
        });
    };
}

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

// endregion asynchronous-actions
