const express = require('express');
const router = new express.Router();
const {getHomePage, getAboutPage, getComposePage, getSpecificPost, createPost, getContactPage} = require('../controller/pages');

router.route('/').get(getHomePage);

router.route('/about').get(getAboutPage);

router.route('/compose').get(getComposePage).post(createPost);

router.route('/contact').get(getContactPage);

router.route('/posts/:id').get(getSpecificPost);

module.exports = router;