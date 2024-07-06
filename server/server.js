const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protectedRoute");
const projectRoutes = require("./routes/projectRoute");
const connectDb = require("./config/db");

dotenv.config();
const app = express();
const Port = process.env.PORT;

connectDb();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/project", projectRoutes);
app.get("/", (req, res) => {
  res.send("server is running on" + " " + Port);
});

app.listen(Port, () => console.log(`Server running on ${Port}`));
