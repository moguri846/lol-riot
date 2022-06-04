import express from "express";
import mongoose from "mongoose";
import { swaggerUi, specs } from "./config/swagger";

import authRoute from "./routes/auth/auth";
import riotRoute from "./routes/riot/riot.route";
import postRoute from "./routes/post/post.route";

import { mongoDBConfig } from "./config/config";

const app: express.Application = express();
const port: string | number = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connect = mongoose
  .connect(mongoDBConfig.mongoDBUri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err: any) => console.log(err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", authRoute);
app.use("/api/riot", riotRoute);
app.use("/api/post", postRoute);

app.listen(typeof port === "string" ? parseInt(port) : port, () => {
  console.log(`connected ${port}`);
});
