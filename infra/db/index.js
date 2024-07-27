import { Pool } from "pg";

const pool = new Pool();

async function query(queryObject) {
  return await pool.query(queryObject);
}

exports.database = {
  query,
};
