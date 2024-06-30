const express = require("express");

const app = express();
const mysql = require("mysql");
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rattrapages",
});
