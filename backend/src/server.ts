import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { createYoga, useReadinessCheck } from "graphql-yoga";
import { createServer } from "node:http";
import { promisify } from "node:util";
import environment from "../../shared/src/environment.ts";
import { databaseAvailable } from "./db/query.ts";
import { schema } from "./schema.ts";

const { BACKEND_DEBUG } = environment();

const yoga = createYoga({
  schema,
  // cors: { origin: BACKEND_CORS_ORIGINS, credentials: true, methods: ['GET', 'POST'] },
  healthCheckEndpoint: "/health",
  landingPage: false,
  graphqlEndpoint: "/graphql",
  graphiql: BACKEND_DEBUG
    ? {
        defaultQuery: "# HELLO", // File a bug here, the default query is ignored
      }
    : false,
  plugins: [
    BACKEND_DEBUG === false && useDisableIntrospection(),
    useReadinessCheck({
      endpoint: "/ready",
      check: async () => {
        try {
          await databaseAvailable();
          // if true, respond with 200 OK
          return false;
        } catch (err) {
          // log the error on the server for debugging purposes
          console.error(err);
          // if false, respond with 503 Service Unavailable and no body
          return false;
        }
      },
    }),
  ],
});

const server = createServer(yoga);

const shutdownServer = async () => {
  const shutdown = promisify(server.close).bind(server);
  try {
    await shutdown();
    console.log("Server closed gracefully");
    process.exit(0);
  } catch (err) {
    console.error("Error during server shutdown", err);
    process.exit(1);
  }
};

const startServer = async () => {
  await new Promise<void>((resolve, reject) => {
    server.listen(80, "0.0.0.0", () => {
      resolve();
    });
    server.on("error", (err) => {
      reject(err);
    });
  });
};

server.once("close", async () => {
  await yoga.dispose();
  console.info("Server is disposed so is Yoga");
});

export { shutdownServer, startServer };
export default server;
