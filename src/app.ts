import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import http from "http";
import path from "path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
// import { Server } from 'socket.io';
import { success, failure } from "./services/response";
// import root from './routes/root';
// import chats from './routes/chats';
import users from "./routes/users";
import sessions from "./routes/sessions";
import services from "./routes/services";
import schedules from "./routes/schedules";
// import notifications from './routes/notifications';
// import photoService from './routes/photoService';
import swaggerDocs from "./swagger.json";
// import socketHandler from './sockets';

const app = express();
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
//   transports: ["websocket", "polling"],
//   allowEIO3: true,
// });
// io.on("connection", socketHandler(io));

app.options("*", cors());
app.use(cors());
app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "./views"));

app.get("/", async (req, res) => {
  return res.json({
    message: "🚀🚀🚀🚀",
    status: "OK",
    swagger: "http://localhost:5000/api-docs/",
  });
});
// app.use("/", root);
// app.use("/chats", chats);
app.use("/users", users);
app.use("/sessions", sessions);
app.use("/services", services);
app.use("/schedules", schedules);
// app.use("/notifications", notifications);
// app.use("/photo-service", photoService);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use("/docs", express.static("docs"));

/* catch all other routes */
app.use(() => {
  throw new Error("This route doesn't exist.");
});

/* handle all errors */
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);

export { app, server };
