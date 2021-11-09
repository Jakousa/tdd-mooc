const { Model } = require("objection");
const Knex = require("knex");

const knex = Knex({
  client: "pg",
  version: "13",
  connection: {
    host: process.env.DATABASE_HOST || "127.0.0.1",
    port: 5432,
    user: "webapp",
    password: "secret",
    database: "webapp",
  },
});

Model.knex(knex);

const { createSchema } = require("./schema")
createSchema(knex)