exports.up = function(knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments('id').primary();
    table.string('title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('maps');
};
