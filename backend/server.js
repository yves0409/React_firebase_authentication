const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//APPLICATION
const app = express();

//CONNECTING TO DATABASE
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log("DATABASE CONNECTION FAILED", err));

//MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//MIDDLEWARE ROUTES LOOPING THROUGH TO PREVENT MULTIPLE ROUTE IMPORTS
//ALL PREFIXED WITH THE /API
//app.use("/api", authRoutes);
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
