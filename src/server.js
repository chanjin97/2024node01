const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const dotenv = require("dotenv");
const { userRouter } = require("./routes/userRouter");
const { blogRouter } = require("./routes/blogRouter");

dotenv.config();

const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB 연결완료~!");
    mongoose.set("debug", true);
    app.use(express.json());

    app.use("/user", userRouter);

    app.use("/blog", blogRouter);

    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};

server();
