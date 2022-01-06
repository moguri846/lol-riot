import express from "express";
const app: express.Application = express();
const port: number = 5000;

app.listen(port, () => {
  console.log(`connected ${port}`);
});
