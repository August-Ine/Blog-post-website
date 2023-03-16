//imports
const mongoose = require("mongoose");
const _ = require("lodash");

//constants
const dbName = "blogdb";

//db schema 
const blogSchema = new mongoose.Schema({
    name: String,
    content: String,
    link: String
});

//db model
const Blog = mongoose.model("Blog", blogSchema);

//default content
const blog1 = new Blog({
    name: "Hello world",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet purus commodo, malesuada enim id, vulputate nibh. Praesent sed commodo dolor, et egestas felis. Quisque porttitor, ex a lacinia euismod, ipsum magna elementum lacus, sit amet commodo lorem mauris euismod quam. Suspendisse potenti. Fusce bibendum est eu mauris dignissim malesuada. In varius neque sit amet sapien ullamcorper, nec lacinia sapien cursus.",
    link: "posts/" + _.capitalize("Hello world")
});
const blog2 = new Blog({
    name: "Orange soda",
    content: "Sed vel urna eget ex finibus pulvinar. Sed in libero in risus blandit commodo. Donec eget dolor turpis. Nullam vel bibendum nisl. Nam tincidunt risus non nunc porttitor hendrerit. Integer euismod tincidunt velit, at consectetur quam elementum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    link: "posts/" + _.capitalize("Orange soda")
});
const blog3 = new Blog({
    name: "Virgil",
    content: "Morbi sit amet magna et nisl pharetra bibendum vel vitae felis. Suspendisse eget urna ac mauris dignissim mollis. Ut bibendum lacus enim, sed euismod nisi ultrices a. Fusce pellentesque augue vel nibh malesuada, a lacinia turpis imperdiet. Nam sit amet purus et dolor vestibulum placerat eu vel nulla. Integer sollicitudin massa in quam congue posuere. Donec vitae urna eleifend, tincidunt ipsum sit amet, malesuada dolor.",
    link: "posts/" + _.capitalize("Virgil")
});

module.exports = {
    Blog: Blog,
    dbName: dbName,
    defaultBlogs: [blog1, blog2, blog3]
}