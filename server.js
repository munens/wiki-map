"use strict";
require('dotenv').config();
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
const mapsRoutes = require("./routes/maps");
const pinsRoutes = require("./routes/pins");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// app.use(express.static("node-modules/bootstrap"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

//Users JSON api
app.use("/api/users", usersRoutes(knex));
app.use("/api/maps", mapsRoutes(knex));
app.use("/api/pins", pinsRoutes(knex));



// npm install express validator and app.use(expressValidator), then should work
// item needs to be the params you are passing - could also just use for
// specific user route
// i.e. req.sanitize(req.body.email).escape()
// app.use((req, res, next) => {
//   for (let item in req.params){
//     req.sanitize(item).escape();
//   }
//   next();
// });

app.use((req, res, next) => {
  if (!(req.cookies["user_id"]) && req.url.match('edit')){
    res.redirect('/login');
  }
  return next();
});

app.get("")

app.get("/maps", (req, res) => {
  knex.select('*',
  'maps.id as map_id')
  //'favorites.map_id as fav_map')
  .from('maps')
  .innerJoin('users', 'users.id', 'maps.user_id')
  //.innerJoin('favorites', 'users.id', 'favorites.user_id')
  .then((results) => {
  res.render("index", {maps: results, user_id: req.cookies["user_id"]});
  });
});

app.get("/favorites", (req, res) => {
  console.log("at favorites");
  knex.select('*')
  .from('favorites')
  .then((results) => {
    console.log(results);
  res.render("index", {favorites: results, user_id: req.cookies["user_id"]});
  });
});

app.get("/login", (req, res) => {
  res.render("login", {user_id: req.cookies["user_id"]})
});

app.post("/login", (req, res) => {
  knex.select('id')
  .from('users')
  .where({'email': req.body.email,
  'password': req.body.password})
  .then((results) => {
    if (results.length === 1) {
      let user_id = results[0].id;
      res.cookie("user_id", user_id);
      res.redirect("/maps");
    } else {
      res.redirect("/login");
    }
  });
});


app.post("/favorites/:id", (req, res) => {
  knex('favorites').insert({
  'user_id': req.cookies["user_id"],
  'map_id': req.params.id})
  .then((results) => {
    res.json(results);
  });
});

app.delete("/favorites/:id", (req, res) => {
  knex('favorites').where({
  'user_id': req.cookies["user_id"],
  'map_id': req.params.id})
  .del()
  .then((results) => {
    res.json(results);
  });
});

app.delete("/maps/:id/pins/:pinid", (req, res) => {
    knex('pins')
    .where('id', req.params.pinid).del().then((resuts) => {
      res.json(resuts);
    });
});

app.post("/signup", (req, res) => {
  knex('users').insert({
  'email': req.body.email,
  'password': req.body.password,
  'name': req.body.username})
  .returning("id")
  .then((results) => {
    let user_id = results[0];
    res.cookie("user_id", user_id);
    res.redirect("/maps");
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/login");
});



app.get("/users/:id", (req, res) => {
  knex.select('*')
  .from('users')
  .returning('id')
  .where('id', $('span').data('id'))
  .then((results) => {
  res.render("user-profile", {users: results[0], user_id: req.cookies["user_id"]})
  });
});


// app.get("/maps/:id/edit", (req, res) => {
//   knex.select('id','title', 'user_id').from('maps').where('id', req.params.id).then((results) => {
//     let templateVars = {
//       id: results[0].id,
//       title: results[0].title,
//       duser_id: results[0].user_id,
//       user_id: req.cookies["user_id"]
//     }
//     res.render("edit", templateVars);
//   });
// });

app.get("/maps/:id/edit", (req, res) => {
 knex.select('*', 'pins.user_id as duser_id')
    .from('pins')
    .innerJoin('maps', 'maps.id', 'pins.map_id')
    .where('map_id', req.params.id)
    .then((results) => {
       let templateVars = {
          pin_id: results[0].id,
          title: results[0].title,
          description: results[0].description,
          latitude: results[0].latitude,
          longitude: results[0].longitude,
          id: results[0].map_id,
          duser_id: results[0].duser_id
        }
        res.render("edit", {result: templateVars, user_id: req.cookies["user_id"]});
    });
});

app.post("/maps", (req, res) => {
  knex('maps').returning("id").insert({
    title: "Edit this Title",
    latitude: 49.2827,
    longitude: -123.1207,
    user_id: req.cookies["user_id"]
    })
    .then((results) => {
      let id = results[0];
      res.redirect(`/maps/${id}/edit`);
    });
});


// app.post("/maps/:id/pins", (req, res) => {

//   knex('pins').insert({
//     'title': req.body.title,
//     'description': req.body.description,
//     'latitude': req.body.latitude,
//     'longitude': req.body.longitude,
//     'map_id': req.params.id,
//     'pin_type': "create",
//     'original_pin_id': 0,
//     'user_id': req.cookies["user_id"]})
//     .then((results) => {

//   });
//      //res.redirect("/maps");

// });

// app.put("/maps/:id", (req, res) => {
//   knex('maps')
//   .where('id', req.params.id).update({
//   title: req.body.title,
//   updated_at: new Date()})
//   .then((results) => {
//     res.json(results);
//   });
// });

app.delete("/maps/:id", (req, res) => {
  knex('maps')
  .where('id', req.params.id).del().then((results) => {
        res.json(results);
    });
  res.redirect("/maps");
});

app.get("/users/:id/maps/created", (req, res) => {
  knex('maps')
  .select('*')
  .where('user_id', req.params.id).then((results) => {
      res.json(results);
  });
});

// app.get("/users/:id/maps/favorited", (req, res) => {
//   knex.select('*')
//   .from('maps')
//   .innerJoin('favorites', 'maps.id', 'map_id')
//   .where('user_id', req.params.id).then((results) => {
//       res.json(results);
//   });
// });

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/users/:id/profile", (req, res) => {
  knex.select('*', 'maps.id as map_id')
  .from('users')
  .innerJoin('maps', 'users.id', 'maps.user_id')
  .where('users.id', req.cookies["user_id"])
  .then((results) => {
  res.render("user-profile", {users: results[0], user_id: req.cookies["user_id"]})
  });
});

///ensure that when user page tries to display the #
///of maps that a user has edited, the same mapid
///is not fetched multiple times

function unique (arr) {
  let firstresults = [];
  let secondresults = [];
  for (let item of arr) {
   if (firstresults.indexOf(item["map_id"]) === -1)  {
        firstresults.push(item["map_id"]);
   }
  }
  for (let mapid of firstresults) {
    let emptyObject = {}
    emptyObject["map_id"] = mapid;
    secondresults.push(emptyObject);
  }
  return secondresults;
}

app.get("/users/:id/maps/edited", (req, res) => {
  knex.select('pins.map_id')
  .from('pins')
  .where('pins.user_id', req.cookies["user_id"]).then((results) => {
    let uniquemapID = unique(results);
    console.log(uniquemapID);
      res.json(uniquemapID);
  });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
