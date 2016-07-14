exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('maps', function(table){
      table.float('latitude');
      table.float('longitude');
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table){
      table.dropColumn('latitude');
      table.dropColumn('longitude');
      table.dropColumn('user_id');
    })
  ])
};
