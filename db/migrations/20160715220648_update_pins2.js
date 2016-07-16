exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('pins', function(table){
      table.integer('original_pin_id');
      table.foreign('original_pin_id').references('pins.id');
      table.dropColumn('updated_at');
      table.string('pin_type');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('original_pin_id');
      table.dropColumn('pin_type');
    })
  ])
};
