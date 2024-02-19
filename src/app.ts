export const app = fastify();

app.register(cookie);

app.register(transactionsRoutes, {
  prefix: "transactions",
});
