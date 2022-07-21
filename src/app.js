//jshint esversion:6
var _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require("ejs");
const {localDb} = require('./db/database');
const homeRouting = require('./Router/routes');

const app = express();
const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../views');

app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', viewsPath);

localDb();

app.use('/',homeRouting);

app.listen(3000,()=> {
  console.log(`Server started on port ${PORT}`);
});
