import express from "express";
import bodyParser from "body-parser";
import { getPosts } from "./posts.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  const posts = getPosts();
  res.render("index.ejs", { title: "Home", posts });
});

app.get("/new-post", (req, res) => {
  res.render("new-post.ejs", { title: "New post" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});