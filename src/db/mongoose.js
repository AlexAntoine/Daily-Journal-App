const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });

module.exports;