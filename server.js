const express = require("express");
const connect = require("./utils/connect");
const app = express();
const path = require("path");

//port
const port = process.env.PORT || 5000;
require("dotenv").config();
//connect to database
connect();

app.use(express.json());
app.use("/api/user", require("./routes/user/user"));

//static
// app.use(express.static());
// app.get("*", (req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`);
// });
//multer middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//listen
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server is running on https://localhost:${port}/`);
});
