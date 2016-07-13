"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const usersRoutes = require("./routes/users");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

//Users JSON apo
app.use("/api/users", usersRoutes(knex));

//HOme page
app.get("/", (req, res) => {
 res.render("index");
});
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
