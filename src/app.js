const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression"); // Include compression

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();

app.use(compression()); // Use compression

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connection.connect();

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// app.get("/test", (req, res) => {
//   // Query to select the first 10 rows from 'properties' table
//   connection.query("SELECT * FROM properties", (err, rows, fields) => {
//     if (err) {
//       // Proper error handling
//       console.error("Error while fetching data: ", err);
//       res.status(500).send("Error while fetching data");
//       return;
//     }
//     // Send the rows as the response
//     //console.log(rows); //update
//     res.send(rows);
//   });
// });

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
