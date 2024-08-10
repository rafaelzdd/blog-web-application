let posts = [];

export function getPosts() {
    return posts;
}

export function getPost(id) {
    return posts.find(post => post.id === parseInt(id));
}