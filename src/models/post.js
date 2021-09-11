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
    }
});

// postSchema.plugin(findOrCreate);


const Post = mongoose.model('Post', postSchema);



module.exports = Post;