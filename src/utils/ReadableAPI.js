const api = "http://localhost:3001";
const headers = new Headers();
headers.append("Authorization", "dWRhY2l0eQ==");

export const getAllPosts = () => {
    fetch(`${api}/posts`, { headers }).then(response => response.json());
};
