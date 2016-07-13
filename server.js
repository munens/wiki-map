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
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//Users JSON api
app.use("/api/users", usersRoutes(knex));

app.get("/maps", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/user", (req, res) => {
  res.render("user-profile");
});
app.get("/maps/:id/edit", (req, res) => {
  knex.select('id','title').from('maps').where('id', req.params.id).then((results) => {
    let templateVars = {
      id: results[0].id,
      title: results[0].title
    }
    res.render("edit", templateVars);
  });
});

app.post("/maps", (req, res) => {
  knex('maps').returning("id").insert({title: ""}).then((results) => {
        let id = results[0];
      res.redirect(`/maps/${id}/edit`);
    });
});

app.put("/maps/:id", (req, res) => {
  knex('maps')
  .where('id', req.params.id).update({title: req.body.title}).then((results) => {
        res.json(results);
    });
  res.redirect("/maps");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
