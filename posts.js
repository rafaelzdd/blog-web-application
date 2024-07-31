let posts = [];
let currentId = 1;

// Adds a new post
export function addPost(title, content) {
    posts.push({ id: currentId++, title, content });
};

// Deletes a post by its ID
export function deletePost(id) {
    posts = posts.filter(post => post.id !== parseInt(id));
};

// Gets a post by its ID
export function getPost(id) {
    return posts.find(post => post.id === parseInt(id));
};

// Edits a post by its ID
export function updatePost(id, title, content) {
    const post = getPost(id);
    if(post) {
        post.title = title;
        post.content = content;
    }
};

export { posts };