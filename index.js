import express from "express";
import bodyParser from "body-parser";
import { posts, addPost, deletePost, getPost, updatePost } from "./posts.js";

const app = express();
const port = 3000;

// Sets EJS as visualization engine
app.set("view engine", "ejs");

// Body parser reqs middleware
app.use(bodyParser.urlencoded({extended: true}));

// Points static files
app.use(express.static("public"));

// Injects layout middleware
app.use((req, res, next) => {
  res.locals.layout = "layout.ejs";
  next();
});

// Main route
app.get("/", (req, res) => {
    res.render("index.ejs", { title: "Home", posts });
  });

// Shows new post form route
app.get("/new-post", (req, res) => {
  res.render("new-post.ejs", { title: "New Post" });
});

// Creates a new post route
app.post("/new-post", (req, res) => {
  addPost(req.body.title, req.body.content);
  res.redirect('/');
});

// Visualizes a post route
app.get("/post/:id", (req, res) => {
  const post = getPost(req.params.id);
  if (post) {
    res.render("view-post", { title: post.title, post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Shows edit form post route
app.get("post/:id/edit", (req, res) => {
  const post = getPost(req.params.id);
  if (post) {
    res.render("edit-post.ejs", { title: "Edit Post", post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Edits a specific post route
app.post("/post/:id/edit", (req, res) => {
  updatePost(req.params.id, req.body.title, req.body.content);
  res.redirect('/');
});

// Deletes a specific post route
app.post("/post/:id/delete", (req, res) => {
  deletePost(req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});