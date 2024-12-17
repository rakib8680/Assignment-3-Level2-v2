import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();

// middlewares / parsers
app.use(express.json());
app.use(cors());

// application route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("hello world ");
});

export default app;
