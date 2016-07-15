exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('pins', function(table){
      table.integer('user_id');
      table.foreign('user_id').references('users.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pins', function(table){
      table.dropColumn('user_id');
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    })
  ])
};
