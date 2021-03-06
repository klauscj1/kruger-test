const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", require("./routes/employees"));
app.use("/api/auth", require("./routes/users"));

app.listen(4000, () => {
  console.log("Server online!");
});
