exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('pins', function(table){
      table.integer('original_pin_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('original_pin_id');
    })
  ])
};
