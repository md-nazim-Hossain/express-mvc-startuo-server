const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const greetingsRouter = require("./router/v1/greetings.router");
const toolsRouter = require("./router/v1/tools.router");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/api/v1/greet", greetingsRouter);
app.use("/api/v1/tools", toolsRouter);

// db connected function
async function run() {
  try {
  } catch (e) {
    console.log(e);
  }
}

app.get("/", (req, res) => {
  res.json({ data: "Hello World" });
});

app.all("*", (req, res) => {
  res.json({ data: "No Route Founds" });
});

app.listen(5000, () => {
  console.log(`Server is Running in ${port} `);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  app.close(() => {
    process.exit(1);
  });
});
