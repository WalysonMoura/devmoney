import {
  describe,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
  it,
  expect,
} from "vitest";
import request from 'supertest'
import { app } from "../src/app";
import { execSync } from "node:child_process";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("pnpm knex -- migrate:rollback --all");
    execSync("pnpm knex -- migrate:latest");
  });


  it('',async () =>{
    await request(app.server).post('/transactions').send({
      title:  'New transaction',
      amount: 5000,
      type: 'credit'
    }).expect(201)
  })
});
