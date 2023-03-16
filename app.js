//imports
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose");
const { ServerApiVersion } = require('mongodb');
const dbModel = require("./dbModel.js"); //import js file for the db model

//create app
const app = express();

//database connection
const uri = "mongodb+srv://akirui95:testing123@cluster0.sicizhi.mongodb.net/?retryWrites=true&w=majority"; //url to connect to mongodb atlas

//prerequisites
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//route to handle get request to root
app.get("/", async (req, res) => {
  //connect to db, create db if doesnt exist
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, dbName: dbModel.dbName });
    console.log("Connection to mongodbatlas succesful.");
    // client.close();
  } catch (err) {
    console.log(err);
  }
  //read from the db
  try {
    const blogsList = await dbModel.Blog.find({});
    //blogsList empty?; runs for the first time to insert default blogs
    if (blogsList.length === 0) {
      try {
        await dbModel.Blog.insertMany(dbModel.defaultBlogs);
      } catch (error) {
        console.log(error);
      }
    } else {
      //render ejs template with blogs
      res.render("home", { blogsList: blogsList });
      // close the MongoDB Atlas connection
      mongoose.connection.close();
    }
  } catch (e) {
    console.log(e);
  }
});

//route for post page
app.get("/posts/:blogid", async (req, res) => {
  const blogId = req.params.blogid;
  //connect to db
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: dbModel.dbName, serverApi: ServerApiVersion.v1 });
    console.log("Connection to mongodbatlas succesful.");
  } catch (err) {
    console.log(err);
  }
  //find the blog document by id from the collection
  try {
    const blogPost = await dbModel.Blog.findById(blogId).exec();
    console.log("found document!");
    //render post ejs template with the blog post
    res.render("post", { blogPost: blogPost });
  } catch (err) {
    console.log(err);
  }
});

//route for about page
app.get("/about", (req, res) => {
  res.render("about", { pageContent: aboutContent });
});

//route for contact page
app.get("/contact", (req, res) => {
  res.render("contact", { pageContent: contactContent });
});

//route to compose new blog posts
app.get("/compose", (req, res) => {
  res.render("compose");
});

//handling post request from compose page
app.post("/compose", async (req, res) => {
  //connect to db
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, dbName: dbModel.dbName });
    console.log("Connection to mongodbatlas succesful.");
  } catch (err) {
    console.log(err);
  }

  //create new blog document
  const blog = new dbModel.Blog(
    {
      name: _.capitalize(req.body.post_title),
      content: req.body.post_body
    }
  );
  //save the blog to db
  try {
    await blog.save();
    console.log("saving blog to db successful");
  } catch (e) {
    console.log(e);
  }
  //close connection to db
  await mongoose.connection.close();
  //redirect to home page
  res.redirect("/");
});











app.listen(3030, function () {
  console.log("Server started on port 3030");
});
