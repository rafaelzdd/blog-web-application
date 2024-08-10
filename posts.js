let posts = [];

export function getPosts() {
    return posts;
}

export function getPost(id) {
    return posts.find(post => post.id === parseInt(id));
}

export function createPost(title, content) {
    const id = posts.length > 0 ? posts[posts.length -1].id + 1 : 1;
    posts.push({ id, title, content });
}