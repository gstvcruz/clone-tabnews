import { Client } from "pg";

const config = {
  ssl: process.env.NODE_ENV === "development" ? false : true,
};

async function query(queryObject) {
  const client = new Client(config);
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
