// Setup Express
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

// Set a static directory for express
app.use(express.static("public"));

// Allow for url encoding and json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Setup Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

