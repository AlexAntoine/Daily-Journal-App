const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const {localDB} = require('./db/mongoose');
const userRouter = require('./Routes/router');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

localDB();

app.use(userRouter);

app.listen(3000,()=>{
  console.log('server is listening on Port 3000');
});


