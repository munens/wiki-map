exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('pin_id');
      table.dropColumn('map_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('pin_id');
    })
  ])
};
