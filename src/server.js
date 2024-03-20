const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const { User } = require("./models/User");

const MONGO_URL =
  "mongodb+srv://chanjindark:Hvn5HPr63NFqywPK@mongodb.kjsgwov.mongodb.net/?retryWrites=true&w=majority&appName=Mongodb";

const server = async function () {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("db 연결완료");

    app.use(express.json());

    app.get("/user", async function (req, res) {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.post("/user", async function (req, res) {
      try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("연결안됨");
  }
};
