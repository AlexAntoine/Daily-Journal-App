const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const {prodDb, devDb} = require('./db/mongoose');
const userRouter = require('./Routes/router');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

prodDb();
// devDb();

app.use(userRouter);

const Post = require('./models/post');
const User = require('./models/users');


//Took a post and found user that created it  
// const main = async()=>{
//   const post = await Post.findById("61465e7e5d7a904c3428398b");
//   await post.populate('author').execPopulate();
//   console.log(post.author);
// }


//Took a user and found their posts 

// const main = async()=>{
//   const user = await User.findById("61465e535d7a904c3428398a");
//   await user.populate('posts').execPopulate();
//   console.log(user.posts);
// }


// main();

//Do not change the port
app.listen(process.env.PORT || 3000,()=>{
  console.log('server is listening on Port 3000');
});


