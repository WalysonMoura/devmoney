import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions").where(
      "session_id",
      sessionId
    );

    return { transactions };
  });
  app.get("/:id", async (request, reply) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionsParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    const transactions = await knex("transactions")
      .where({
        session_id: sessionId,
        id,
      })
      .first();

    return {
      transactions,
    };
  });
  app.get("/sumary", async (request, reply) => {
    const { sessionId } = request.cookies;

    const summary = await knex("transactions")
      .where("session_id", sessionId)
      .sum("amount", { as: "amount" })
      .first();

    return { summary };
  });
  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
