const Post = require('../models/post');

exports.getHomePage = async(req, res)=>{
    const posts = await Post.find();
    res.render('home',{
      posts
    });
}

exports.getSpecificPost = async(req, res)=>{
    const {title, content} = await Post.findOne({_id:req.params.id})

    res.render('post',{
     title:title,
     content:content
    })
}

exports.getAboutPage = (req, res)=>{
    res.render('about');
}

exports.getComposePage = (req, res)=>{
    res.render('compose');
}

exports.getContactPage = (req, res)=>{
    res.render('contact');
}


exports.createPost = async(req, res)=>{
   const {postTitle, postContent} = req.body;

   const createPost = new Post({
       title:postTitle,
       content: postContent
   });

   await createPost.save();

   res.redirect('/');
}