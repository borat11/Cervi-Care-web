const mongoose = require("mongoose");

function dbConnection() {
  const uri = process.env.MONGODB_URL;

  if (!uri) {
    console.error("❌ MONGODB_URL is not defined in .env");
    process.exit(1); // Stop server if URL missing
  }

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
}

module.exports = dbConnection;
