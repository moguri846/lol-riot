import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { swaggerUi, specs } from "./config/swagger";

import userRoute from "./routes/user/user";
import oAuthRoute from "./routes/oAuth/oAuth";
import riotRoute from "./routes/riot/riot";
import postRoute from "./routes/post/post";

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

const connect = mongoose
  .connect(mongoDBConfig.mongoDBUri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err: any) => console.log(err));

app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/user", userRoute);
app.use("/api/oauth", oAuthRoute);
app.use("/api/riot", riotRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log(`connected ${port}`);
});
