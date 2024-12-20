const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const taskRoutes = require("./Routes/taskRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api", taskRoutes);
app.use(cors());
app.get("/", (req, res) => {
  res.send({ message: "Api is working" });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, "localhost", () => {
  console.log(`server is running on PORT:${PORT}`);
});
