

import express from "express";
import cors from "cors";
const app = express();



// middlewares / parsers
app.use(express.json())
app.use(cors())



// application route
app.get("/", (req, res) => {
    res.send("hello world ");
  });
  






export default app;