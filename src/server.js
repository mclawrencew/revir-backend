const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./config/database");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const flightRoutes = require("./routes/flights");
const hotelRoutes = require("./routes/hotels");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "REVIR API is running!",
    status: "OK",
    features: ["User Registration", "Authentication", "Database", "Flight Search", "Hotel Search"]
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("/api/test", async (req, res) => {
  try {
    const userCount = await User.count();
    res.json({
      success: true,
      message: "Database is working!",
      users: userCount
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Database not connected",
      error: error.message
    });
  }
});

async function startServer() {
  try {
    await initializeDatabase();
    await User.sync();
    console.log("📊 Database tables created");
    
    app.listen(8080, () => {
      console.log("🚀 REVIR Server running on http://localhost:8080");
      console.log("🔐 Auth endpoints: /api/auth/register, /api/auth/login");
      console.log("✈️ Flight search: /api/flights/search");
      console.log("🏨 Hotel search: /api/hotels/search");
      console.log("🧪 Test endpoint: /api/test");
      console.log("🌐 CORS enabled!");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
