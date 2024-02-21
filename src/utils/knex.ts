import { Knex, knex as setupKnex } from "knex";
import { config } from "../database";

export const knex = setupKnex(config);
