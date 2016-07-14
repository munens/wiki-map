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
  knex.select('*').from('maps').then((results) => {
  res.render("index", {maps: results});
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/signup", (req, res) => {
  knex('users').insert({email: req.body.email}, {password: req.body.password}, {name: req.body.username}).then((results) => {
  // res.cookie("username", req.body.username);
  res.redirect("/maps");
});
});

app.post("/logout", (req, res) => {
  // res.clearCookie("username");
  res.redirect("/");
});

app.get("/user", (req, res) => {
  knex.select('*').from('maps').then((results) => {
  res.render("user-profile", {users: results});
  });
});

app.get("/maps/:id/edit", (req, res) => {
  knex.select('id','title').from('maps').where('id', req.params.id).then((results) => {
    let templateVars = {
      id: results[0].id,
      title: results[0].title
      // username: req.cookies["username"],
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

app.post("/maps/pins", (req, res) => {
  console.log(req.body.title);
  knex('pins').insert({
    'title': req.body.title,
    'description': req.body.description,
    'latitude': req.body.latitude,
    'longitude': req.body.longitude})
    .then((results) => {

    });
    res.redirect("/maps");
});

app.put("/maps/:id", (req, res) => {
  knex('maps')
  .where('id', req.params.id).update({title: req.body.title}).then((results) => {
        res.json(results);
    });
  res.redirect("/maps");
});

app.delete("/maps/:id", (req, res) => {
  knex('maps')
  .where('id', req.params.id).del().then((results) => {
        res.json(results);
    });
  res.redirect("/maps");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
