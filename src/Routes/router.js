const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Post = require('../models/post');
const {homeStartingContent,aboutContent,contactContent} = require('../data');

//GET ROUTES

router.get('/', async(req, res)=>{   
    const posts = await Post.find();

    res.render('home', {
        _homeContent: homeStartingContent,
        posts
    
    });
   
});

router.get('/about',(req,res)=>{
    res.render('about',{_aboutContent: aboutContent});
});

router.get('/contact',(req, res)=>{
    res.render('contact',{_contactContent:contactContent});
});

router.get('/compose', (req, res)=>{
    res.render('compose');
});

//POST ROUTES
  
router.get('/posts/:postId', async(req, res)=>{

   const {title, content} = await Post.findOne({_id:req.params.postId});

    res.render('posts', {
        post_title: title,
        post_content: content
    });

});
  
router.post('/compose', async(req, res)=>{
 
    const _blogPost ={
        _title: req.body.title,
        content: req.body.blogPost
    };

    const posts = new Post({
        title: _blogPost._title,
        content:_blogPost.content

    });

    await posts.save();

    res.redirect('/');
});

  
module.exports = router;