import "reflect-metadata";
import { app } from "./app";
import { env } from "./env";
import "./container";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`Api running on port ${env.PORT}`);
  });
