const mongoose = require('mongoose');

const localDb = ()=>{
    //New URL for Node Js update.
    return mongoose.connect('mongodb://127.0.0.1:27017/daily-blogDB');
}

module.exports = {
    localDb
}