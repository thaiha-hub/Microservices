const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const supplier = require("./app/controller/supplier.controller");
const app = express();
const mustacheExpress = require("mustache-express");
const favicon = require('serve-favicon');

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static('public'));
app.use(favicon(__dirname + "/public/img/favicon.ico"));

// Home page
app.get("/", (req, res) => {
    res.render("home", {});
});

// List all suppliers (read-only)
app.get("/suppliers/", supplier.findAll);

// Show supplier details (read-only)
app.get("/supplier-update/:id", supplier.findOne);

// Removed create, update, delete POST routes for read-only

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).render("404", {});
});

// Start server
const app_port = process.env.APP_PORT || 8080;
app.listen(app_port, () => {
    console.log(`Server is running on port ${app_port}.`);
});
