import { Knex, knex as setupKnex } from "knex";

import { env } from "./env";

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: env.DATABASE_CLIENT,
    connection: {
      filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
      extension: "ts",
      directory: "./db/migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export const knex = setupKnex(config);
