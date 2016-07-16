exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function (table) {
    table.integer('map_id');
    table.foreign('map_id').references('maps.id');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
