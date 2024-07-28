import { Client } from "pg";

function getSSLValues() {
  return process.env.PGCA
    ? { ca: process.PGCA }
    : process.env.NODE_ENV === "development"
      ? false
      : true;
}

const config = {
  ssl: getSSLValues(),
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
