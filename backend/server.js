const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // .env must be inside backend folder

const app = express();

/* ---------- Middleware ---------- */
app.use(cors()); // allow all origins (safe for dev)
app.use(express.json());

/* ---------- MongoDB Connection ---------- */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in backend/.env or Render environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------- Routes ---------- */
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

/* ---------- Root Test Route ---------- */
app.get("/", (req, res) => {
  res.send("Recipe Book backend is running 🚀");
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});