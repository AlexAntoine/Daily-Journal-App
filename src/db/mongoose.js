require('dotenv').config();
const mongoose = require('mongoose');

const prodDb = () =>{
    
    mongoose.set('useCreateIndex', true);
    mongoose.connect(process.env.PROD_DB, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });
    console.log('prod db is connected')
}

const devDb = () =>{

    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true });
    console.log('dev db is connected');
}

module.exports = {
    prodDb,
    devDb
}