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
  
  router.get("/:id/pins", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('map_id', req.params.id).then((results) => {
  	  	res.json(results);
  	  });
  	  
  });

  router.get("/:id/pins/:id", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('map_id', req.params.id).then((results) => {
  	  	res.json(results);
  	  });
  	  
  });

  return router;
}



