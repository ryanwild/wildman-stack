//import { databaseAvailable } from "./db/kaybee.ts";

import fastifyCors from "@fastify/cors";
import { fromNodeHeaders } from "better-auth/node";
import Fastify from "fastify";
import environment from "../../shared/src/environment.ts";
import { auth } from "./lib/auth.ts";

const { DOMAIN } = environment();
const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: `https://${DOMAIN}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Forwarded-For",
  ],
  credentials: true,
  maxAge: 86400,
});

fastify.route({
  method: ["GET"],
  url: "/health",
  async handler(request, reply) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ status: "ok" });
  },
});

// Register authentication endpoints
fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `https://${request.headers.host}`);
      console.log(">>>>>>>>>>>>>>> ?", url);
      // Convert Fastify headers to standard Headers object
      const headers = fromNodeHeaders(request.headers);

      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });

      // Process authentication request
      const response = await auth.handler(req);
      // Forward response to client
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      return reply.send(response.body ? await response.text() : null);
    } catch (err) {
      fastify.log.error("Authentication error: " + err);
      return reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
});

fastify.get("/api/auth/me", async (request, reply) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });
  if (!session) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  return reply.send(session);
});

const shutdownServer = async () => {
  fastify.close().then(
    () => {
      console.log("successfully closed!");
    },
    (err) => {
      console.log("an error happened", err);
    },
  );
};

const startServer = async () => {
  // Initialize server
  fastify.listen({ port: 80, host: "0.0.0.0" }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log("Server running on 0.0.0.0:80");
    console.log(fastify.printRoutes());
  });
};

export { shutdownServer, startServer };
export default fastify;
