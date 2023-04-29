require("dotenv").config();
const express = require("express");
const sequelize = require("./config/connection");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const evalRoutes = require("./routes/evalRoutes");

const app = express();

// db connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// middleware
app.use(express.json());

// routes
app.use(authRoutes);
app.use(historyRoutes);
app.use(evalRoutes);

app.listen(process.env.port || 3000, function () {
  console.log("Listening for request on port", process.env.port || 3000);
});
