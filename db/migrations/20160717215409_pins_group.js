exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('pins', function(table){
      table.string('group');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('group');
    })
  ])
};
