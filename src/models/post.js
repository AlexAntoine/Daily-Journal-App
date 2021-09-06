const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title:{
      type: String,
      required: [true, 'posted title is required']
    },
  
    content:{
      type:String,
      required: [true, 'post content is required']
    }
  
  });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;