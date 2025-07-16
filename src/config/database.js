const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("📊 Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

module.exports = { sequelize, initializeDatabase };
