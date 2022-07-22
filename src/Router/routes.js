const express = require('express');
const router = new express.Router();
const {getHomePage, getAboutPage, getComposePage, getLoginPage, getSignupPage, getSpecificPost, createPost, getContactPage, sendSignupInfo, sendLoginInfo} = require('../controller/pages');

router.route('/').get(getHomePage);

router.route('/about').get(getAboutPage);

router.route('/compose').get(getComposePage).post(createPost);

router.route('/contact').get(getContactPage);

router.route('/login').get(getLoginPage).post(sendLoginInfo);

router.route('/signup').get(getSignupPage).post(sendSignupInfo);

router.route('/posts/:id').get(getSpecificPost);

module.exports = router;