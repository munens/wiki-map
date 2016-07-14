exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('maps', function(table){
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', function(table){
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    })
  ])
};
