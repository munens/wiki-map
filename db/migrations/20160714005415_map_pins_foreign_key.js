exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('maps', function(table){
     table.integer('pin_id');
     table.foreign('pin_id').references('pins.id');
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
