const express = require("express");
const cors = require("cors");
require("dotenv").config();

const importRoutes = require("./routes/importRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api", importRoutes);

app.get("/", (req, res) => {
  res.send("GrowEasy Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});