const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const db = require('./db/mongoose');
const userRouter = require('./Routes/router');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(userRouter);

//Do not change the port
app.listen(3000,()=>{
  console.log('server is listening on Port 3000');
});


