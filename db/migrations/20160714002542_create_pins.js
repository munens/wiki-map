exports.up = function(knex, Promise) {
  return knex.schema.createTable('pins', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.float('latitude');
    table.float('longitude');
    table.integer('map_id');
    table.foreign('map_id').references('maps.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pins');
};
