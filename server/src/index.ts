import express from "express";
import cors from "cors";
const app: express.Application = express();
const port: number = 5000;

// 이 주소만 cors 허용
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`connected ${port}`);
});
