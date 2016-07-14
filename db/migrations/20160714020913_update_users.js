exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('users', function(table){
     table.integer('map_id');
     table.foreign('map_id').references('maps.id');
     table.integer('pin_id');
     table.foreign('pin_id').references('pins.id');
     table.string('handle');
     table.string('password');
     table.string('email');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.dropColumn('map_id');
    })
  ])
};
