import { database } from "/infra/db/index.js";

async function getDatabaseVersion() {
  const query = "SHOW server_version;";
  const result = await database.query(query);
  return result.rows[0].server_version;
}

async function getMaxConnections() {
  const query = "SHOW max_connections;";
  const result = await database.query(query);
  return parseInt(result.rows[0].max_connections);
}

async function getOpenedConnections() {
  const query = `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`;
  const result = await database.query({
    text: query,
    values: [process.env.PGDATABASE],
  });
  return result.rows[0].count;
}

async function status(request, response) {
  response.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: await getDatabaseVersion(),
        max_connections: await getMaxConnections(),
        opened_connections: await getOpenedConnections(),
      },
    },
  });
}

export default status;
