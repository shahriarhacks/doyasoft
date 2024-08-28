import { Server } from "http";
import { connectDB } from "./db/connect";
import { config } from "./config";
import { app } from "./app";

let server: Server;

const runner = async () => {
  try {
    connectDB()
      .then(() => {
        server = app.listen(config.port, () => {
          console.log(`Listening on port ${config.port}`);
        });
        app.on("error", (error) => {
          console.log(`Server Listening ERROR: `, error);
        });
      })
      .catch((err) => console.log("MONGODB connection failed!!!", err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

runner();
