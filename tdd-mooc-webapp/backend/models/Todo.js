const { Model } = require("objection");
const Knex = require("knex");

// Initialize knex.
const knex = Knex({
  client: "pg",
  version: "13",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "webapp",
    password: "secret",
    database: "webapp",
  },
});

Model.knex(knex);

class Todo extends Model {
  static get tableName() {
    return 'todos';
  }

  static get relationMappings() {
    return {
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable('todos')) {
    return;
  }

  await knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.string('text').notNullable();
    table.boolean('completed').defaultTo(false);
  });
}

createSchema()

module.exports = Todo