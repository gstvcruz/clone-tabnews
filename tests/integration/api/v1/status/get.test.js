async function getResponseBody() {
  const response = await fetch("http://localhost:3000/api/v1/status");
  return await response.json();
}

async function getDatabaseDependencies() {
  const responseBody = await getResponseBody();
  return responseBody.dependencies.database;
}

test("GET to /api/v1/status should return status code 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const statusCode = response.status;
  expect(statusCode).toEqual(200);
});

test("GET to /api/v1/status should return updated_at", async () => {
  const responseBody = await getResponseBody();
  const updatedAt = responseBody.updated_at;

  expect(updatedAt).toBeDefined();

  const parsedUpdatedAt = new Date(updatedAt).toISOString();
  expect(updatedAt).toEqual(parsedUpdatedAt);
});

test("GET to /api/v1/status should return version", async () => {
  const databaseDependencies = await getDatabaseDependencies();
  const databaseVersion = databaseDependencies.version;

  expect(databaseVersion).toBeDefined();
  expect(databaseVersion).toEqual("16.0");
});

test("GET to /api/v1/status should return max_connections", async () => {
  const databaseDependencies = await getDatabaseDependencies();
  const maxConnections = databaseDependencies.max_connections;

  expect(maxConnections).toBeDefined();
  expect(maxConnections).toEqual(100);
});

test("GET to /api/v1/status should return opened_connections", async () => {
  const databaseDependencies = await getDatabaseDependencies();
  const openedConnections = databaseDependencies.opened_connections;

  expect(openedConnections).toBeDefined();
  expect(openedConnections).toEqual(1);
});
