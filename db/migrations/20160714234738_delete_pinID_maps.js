exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('maps', function(table){
      table.dropColumn('pin_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table){
      table.dropColumn('pin_id');
    })
  ])
};
