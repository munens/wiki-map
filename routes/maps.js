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

  router.get("/:id/pins/:pinid", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('pinid', req.params.id).then((results) => {
  	  	res.json(results);
  	  });
  	  
  });

  return router;
}



