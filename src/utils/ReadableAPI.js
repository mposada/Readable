const api = "http://localhost:3001";
const headers = new Headers();
headers.append("Authorization", "dWRhY2l0eQ==");
headers.append("Content-Type", "application/json");

/**
 * get all posts for all categories
 */
export function getAllPosts() {
    return fetch(`${api}/posts`, { headers })
        .then(
            response => response.json(),
            error => console.log("An error occured.", error)
        )
        .then(jsonResponse => {
            const posts = jsonResponse.reduce((posts, post) => {
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

            return posts;
        });
}

export function getPost(id) {
    return fetch(`${api}/posts/${id}`, { headers })
        .then(response => response.json(), error => console.log("Error"))
        .then(post => {
            return {
                [post.category]: post
            };
        });
}

export function getComments(postID) {
    return fetch(`${api}/posts/${postID}/comments`, { headers })
        .then(response => response.json(), error => console.log("Error"))
        .then(jsonResponse => {
            const comments = jsonResponse.reduce((comments, comment) => {
                if (comments[comment.parentId]) {
                    return {
                        ...comments,
                        [comment.parentId]: [comment].concat(
                            comments[comment.parentId]
                        )
                    };
                } else {
                    return {
                        ...comments,
                        [comment.parentId]: comment
                    };
                }
            }, {});

            return comments;
        });
}

export function createPost(body) {
    return fetch(`${api}/posts/`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("An error occured.", error));
}

export function updatePost(id, body) {
    return fetch(`${api}/posts/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("Error updating the post", error));
}

export function deletePost(id) {
    return fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers
    })
        .then(response => response.json())
        .catch(error => console.log("Error updating the post", error));
}

export function votePost(vote, post) {
    const body = { option: vote };
    return fetch(`${api}/posts/${post.id}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("Error voting the post", error));
}

export function deleteComment(id) {
    return fetch(`${api}/comments/${id}`, {
        method: "DELETE",
        headers
    })
        .then(response => response.json())
        .catch(error => console.log("Error voting the post", error));
}

export function createComment(body) {
    return fetch(`${api}/comments/`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("An error occured.", error));
}

export function requestUpdateComment(comment, body) {
    return fetch(`${api}/comments/${comment.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("An error occured.", error));
}

export function requestVoteComment(vote, comment) {
    const body = { option: vote };
    return fetch(`${api}/comments/${comment.id}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("Error voting the post", error));
}
