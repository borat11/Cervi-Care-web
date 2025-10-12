const express = require("express");
const cors = require("cors");
const dbConnection = require("./helper/dbConnections");
require("dotenv").config();
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

dbConnection();

app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend's exact origin
    credentials: true, // Important for handling cookies and authentication
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

const auth = require("./routes/auth/auth");
const feedback = require("./routes/feedback/feedback");

app.use("/api/auth", auth);
app.use("/api/feedback", feedback);


const authMiddleware = require("./middleware/authMiddleware");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route", user: req.user });
});

const PORT = process.env.PORT ;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);