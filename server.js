import express from "express";
import mongoose from "mongoose";

import Data from "./data.js";
import Videos from "./dbModel.js";
// config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*");
  res.setHeaders("Access-Control-Allow-Headers", "*");
  next();
});
// DB config
const connectionURI =
  "mongodb+srv://ifeanyi-learn:ifeanyi@cluster0.zgckt.mongodb.net/tiktok-clone?retryWrites=true&w=majority";
mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// api endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", async (req, res) => {
  try {
    const AllVideos = await Videos.find();
    return res.status(200).send(AllVideos);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/v2/posts", async (req, res) => {
  try {
    const dbVideos = req.body;
    console.log(req.body);
    const newVideo = await Videos.create(dbVideos);
    return res.status(201).send(newVideo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
