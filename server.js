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

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});