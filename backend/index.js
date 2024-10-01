require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./config/dbconnet");

const app = express();
const port = process.env.PORT;

const userrouts = require("./routes/userroute");
const petroute = require("./routes/petroute");

app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());

connect();

app.use("/api/user", userrouts);
app.use("/api/pet", petroute);

app.get("/hello", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
});
