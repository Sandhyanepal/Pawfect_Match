require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connect = require("./config/dbconnet");

const app = express();
const port = process.env.PORT;

const userRoute = require("./routes/userroute");
const petRoute = require("./routes/petroute");
const categoryRoute = require('./routes/categoryRoute');
const meetformRoute = require('./routes/meetformRoute')

app.use(cors());
app.use(express.static("uploads"));
// app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies

connect();

// app.use("/api/user", userrouts);
// app.use("/api/pet", petroute);
app.use(userRoute);
app.use(petRoute);
app.use(categoryRoute)
app.use(meetformRoute)

app.get("/hello", (req, res) => {
  return res.send("hello");
});

app.listen(port, () => {
  console.log(`Server started successfully at port ${port}`);
});
