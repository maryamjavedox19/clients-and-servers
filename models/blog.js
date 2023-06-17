const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //schema is going to define the structure of documents

const blogSchema = new Schema({    //this objects describes the structure of documents 
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
  }, { timestamps: true });        //constructor
  

//   two arguments             name,  what kind of schema       name should be singular of collection name
  const Blog = mongoose.model('Blog', blogSchema);
  module.exports = Blog;