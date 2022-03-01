import express from "express";
import { swaggerUi, specs } from "./config/swagger";
import cors from "cors";
import oauthRoute from "./routes/oauth";
import riotRoute from "./routes/riot";
import postRoute from "./routes/post";
import { mongoDBConfig } from "./config/config";
const app: express.Application = express();
const port: number = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 이 주소만 cors 허용
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // FIXME: origin이 undefined로 나와서 임시로 사용
      callback(null, true);
      // callback(new Error("Not Allowed Origin!"));
    }
  },
};

const mongoose = require("mongoose");
const connect = mongoose
  .connect(mongoDBConfig.mongoDBUri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err: any) => console.log(err));

app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/oauth", oauthRoute);
app.use("/api/riot", riotRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`connected ${port}`);
});
