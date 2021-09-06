const mongoose = require('mongoose');

const productionDB = ()=>{

}

const localDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });
}

module.exports = {
    productionDB,
    localDB
}