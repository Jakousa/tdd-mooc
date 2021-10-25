async function createSchema(knex) {
  if (await knex.schema.hasTable('todos')) {
    return;
  }

  await knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.string('text').notNullable();
    table.boolean('completed').defaultTo(false);
  });
}

module.exports = { createSchema }