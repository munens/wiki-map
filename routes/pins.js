"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id/pins", (req, res) => {
  	knex
  	  .select('*')
  	  .from('pins').where('id', req.params.id).then((results) => {
  	  	res.json(results);
  	  });
  	  
  });
  
  return router;
}
