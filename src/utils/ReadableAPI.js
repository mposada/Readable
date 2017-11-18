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

export function createPost(body) {
    return fetch(`${api}/posts/`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(error => console.log("An error occured.", error));
}
