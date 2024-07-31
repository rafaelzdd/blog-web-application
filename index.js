import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';
import ejs from 'ejs';
import { getPosts, getPost, createPost, updatePost, deletePost } from "./posts.js";

const app = express();
const porta = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use(session({
  secret: '111111',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Rotas
app.get("/", (req, res) => {
  const posts = getPosts();
  res.render("index", { title: "Home", posts });
});

app.get("/post/:id", (req, res) => {
  const post = getPost(req.params.id);
  if (post) {
    res.render("view-post", { title: post.title, post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/new-post", (req, res) => {
  res.render("new-post", { title: "New Post" });
});

app.post("/post", (req, res) => {
  createPost(req.body.title, req.body.content);
  res.redirect("/");
});

app.get("/post/:id/edit", (req, res) => {
  const post = getPost(req.params.id);
  if (post) {
    res.render("edit-post", { title: "Edit Post", post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/post/:id", (req, res) => {
  updatePost(req.params.id, req.body.title, req.body.content);
  res.redirect("/");
});

app.post("/post/:id/delete", (req, res) => {
  deletePost(req.params.id);
  res.redirect("/");
});

app.listen(porta, () => {
  console.log(`Listening on port ${porta}`);
});