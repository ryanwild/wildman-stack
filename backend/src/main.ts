import { startServer, shutdownServer } from "./server.ts";

try {
  await startServer();
} catch (err) {
  console.error("Error starting server:", err);
  await shutdownServer();
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received.");
  await shutdownServer();
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received.");
  await shutdownServer();
  process.exit(0);
});

process.on("uncaughtException", function (err) {
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

