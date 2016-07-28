"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
  	knex
  	  .select('*')
  	  .from('maps').then((results) => {
  	  	res.json(results);
  	  });

  });

  router.put("/:id", (req, res) => {
    knex('maps')
      .where('id', req.params.id)
      .update({
        title: req.body.title,
        updated_at: new Date()})
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/:id/pins", (req, res) => {
    console.log('post mapid pins');

    console.log(req.body)


    knex('pins').insert({
      'title': req.body.title,
      'description': req.body.description,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'map_id': req.params.id,
      'pin_type': "create",
      'group' : req.body.group,
      'original_pin_id': 0,
      'user_id': req.cookies["user_id"]})
      .then((results) => {

      });

  });

  router.get("/:id/edit", (req, res) => {

    knex.select('*', 'pins.user_id as duser_id')
    .from('pins')
    .innerJoin('maps', 'maps.id', 'pins.map_id')
    .where('map_id', req.params.id)
    .then((results) => {

         // let templateVars = {
         //    pin_id: results[0].id,
         //    title: results[0].title,
         //    description: results[0].description,
         //    latitude: results[0].latitude,
         //    longitude: results[0].longitude,
       
         //res.render("edit", {result: templateVars, user_id: req.cookies["user_id"]});
        res.json(results);
    });
});




  router.delete("/:id/pins/:pinid", (req, res) => {
    console.log(req.params)

    knex('pins')
    .where('id', req.params.pinid).del().then((results) => {
      res.json(results);
    });

  });

  router.get("/:id", (req, res) => {
  	knex
  	  .select('*')
  	  .from('maps').where('id', req.params.id).then((results) => {
  	  	res.json(results[0]);
  	  });

  });

  router.get("/:id/pins", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('map_id', req.params.id).then((results) => {
  	  	res.json(results);
  	  });

  });

  /************not used **************/

  router.get("/:id/pins/:pinid", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('pinid', req.params.id).then((results) => {
  	  	res.json(results);
  	  });

  });

  /***********************************/

  return router;
}



