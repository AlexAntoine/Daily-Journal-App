require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Post = require('../models/post');
const User = require('../models/users');
const findOrCreate = require('mongoose-findorcreate');
//require these packages
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

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{

    User.findById(id, (err, user)=>{

        done(err, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: PROD_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ username: profile.id, email: profile.emails[0].value, authorName: profile.displayName}, function (err, user) {
      return cb(err, user);
    });
  }
));

/********* GOOGLE AUTH ROUTE ***********/
router.get('/auth/google', passport.authenticate('google',{
    scope: ['Profile', 'email']
}));

router.get("/auth/google/blog",
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res)=>{
        res.redirect('/home');
    }
)

/********* GET ROUTES ***********/
router.get('/',(req,res)=>{
    res.render('login');
});

router.get('/signup', (req, res)=>{
    res.render('signup');
});

router.get('/home', async(req, res)=>{   

    if(req.isAuthenticated()){

        const posts = await Post.find({author: req.user._id})
    
        res.render('home',{
            posts
        });
    }
    else{
        res.redirect('/');
    }
});

router.get('/about',(req,res)=>{
    res.render('about');
});

router.get('/compose', (req, res)=>{

    if(req.isAuthenticated()){
        
        res.render('compose');
    }
    else
    res.redirect('/');
});
  
router.get('/posts/:postId', async(req, res)=>{

   if(req.isAuthenticated()){
        const post = await Post.findOne({_id:req.params.postId});

        res.render('posts', {
            post_title: post.title,
            post_content: post.content,
            post
            
        });

   }
});

router.get('/logout', (req, res)=>{
    req.logout();
    
    res.redirect('/');
})
//POST ROUTES
router.post('/signup', async(req, res)=>{

    let errors = [];

    User.register({username:req.body.username},req.body.password, (error, user)=>{

        if(error)
        {
            errors.push({message: error.message})
            res.render('signup', {errors})
        }else{
            passport.authenticate("local")(req, res, ()=>{
                res.redirect('/home')
            })
        }
         
    });
});

//Login route
router.post('/', async(req, res)=>{
    let errors = [];

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    const specificUser =  await User.findOne({username: req.body.username});

    if(specificUser === null){
        errors.push({message: 'This email has not been registered'});
        res.render('login', {errors});
    }

    req.login(user, (error)=>{

        if(error)
        {
            console.log("login error", error);
        }
        else{
            passport.authenticate('local')(req,res,()=>{
                res.redirect('/home');
            })
        }
       
    });
});

router.post('/compose', async(req, res)=>{

    const {title,blogPost} =  req.body;

    const posts = new Post({
        title,
        content:blogPost,
        author: req.user._id
    });

    const result  = await posts.save();
    res.redirect('/compose');
});

router.post('/delete', async(req, res)=>{
    const postId = req.body.deletedPost

    const result = await Post.deleteOne({_id: postId})
    
    res.redirect('home');
    
});



  
module.exports = router;