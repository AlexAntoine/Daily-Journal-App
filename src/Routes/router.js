require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Post = require('../models/post');
const User = require('../models/users');
const {homeStartingContent,aboutContent,contactContent} = require('../data');
const findOrCreate = require('mongoose-findorcreate');
//require these three packages
const session = require('express-session');
const passport = require('passport');

router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
  
router.use(passport.initialize());

router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//GET ROUTES
router.get('/',(req,res)=>{
    res.render('login');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.get('/home', async(req, res)=>{   

    if(req.isAuthenticated()){

        const posts = await Post.find();
        res.render('home', {
            _homeContent: homeStartingContent,
            posts
    
        });
    }
    else{
        res.redirect('/');
    }
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
  
router.get('/posts/:postId', async(req, res)=>{

   const {title, content} = await Post.findOne({_id:req.params.postId});

    res.render('posts', {
        post_title: title,
        post_content: content
    });

});
//POST ROUTES
router.post('/signup', async(req, res)=>{

    User.register({username:req.body.username},req.body.password, (error, user)=>{
        if(error)
        {
            console.log(err);
            res.redirect('/signup');
        }else{
            passport.authenticate("local")(req, res, ()=>{
                res.redirect('/home')
            })
        }
         
    });
});

//Login route
router.post('/', (req, res)=>{

    console.log(req.body)

    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (error)=>{

        if(error)
        {
            console.log(error);
        }
        else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/home');
            })
        }
       
    });
})
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

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

  
module.exports = router;