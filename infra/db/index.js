import { Client } from "pg";

async function query(queryObject) {
  const client = new Client();
  try {
    await client.connect();
    return await client.query(queryObject);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

exports.database = {
  query,
};
