"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}

// $(document).ready(function() {
//   $('.user-page').on("click", function() {
//     module.exports = (knex) => {

//       router.get("/:id", (req, res) => {
//         knex('users')
//           .returning('id')
//           .select("*")
//           .from("users")
//           .where('id', $('span').data('id'))
//           .then((results) => {
//             let id = results[0];
//             res.redirect(`users/${id}`);
//         });
//       });
//     return router;
//     }
//   });
// });



