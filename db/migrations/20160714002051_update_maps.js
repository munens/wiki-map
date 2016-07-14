exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('maps', function(table){
      table.integer('latitude');
      table.integer('longitude');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table){
      table.dropColumn('latitude');
      table.dropColumn('longitude');
    })
  ])
};
