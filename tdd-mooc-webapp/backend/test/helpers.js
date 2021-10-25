const Knex = require("knex");
const { Model } = require("objection");
const { createSchema } = require("../models/schema")

const createDatabase = async (database) => {
  if (!database) throw new Error('Please give database name')

  const databaseFullName = `todo_test_${database}`

  const knex = Knex({
    client: "pg",
    version: "13",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "webapp",
      password: "secret",
    },
  });
  
  try {
    await knex.raw(`CREATE DATABASE ${databaseFullName}`)
  } catch (_) { /* w/e */}

  return {
    useDatabase: async () => {
      const knexWithDatabase = Knex({
        client: "pg",
        version: "13",
        connection: {
          host: "127.0.0.1",
          port: 5432,
          user: "webapp",
          password: "secret",
          database: databaseFullName
        },
      });
      Model.knex(knexWithDatabase)
      await createSchema(knexWithDatabase)
    },
    dropDatabase: async () => {
      Model.knex().destroy()
      await knex.raw(`DROP DATABASE ${databaseFullName}`)
      knex.destroy()
    }
  }
}

module.exports = {
  createDatabase
}