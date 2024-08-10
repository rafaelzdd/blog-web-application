import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home Page" });
});

app.get("/new-post", (req, res) => {
  res.render("new-post.ejs", { title: "New post" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});