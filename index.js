import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { posts, addPost, deletePost, getPost, updatePost } from './posts';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });