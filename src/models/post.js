const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
 
const postSchema = new mongoose.Schema({

    title:{
      type: String,
      required: [true, 'posted title is required']
    },
  
    content:{
      type:String,
      required: [true, 'post content is required']
    },

    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      // required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;