import { database } from "infra/db/index.js";

beforeAll(async () => {
  await database.query(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    `);
});

test("GET to /api/v1/migrations should dry run migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
