require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./src/User"); // Update path if necessary

const app = express();
app.use(express.json());
app.use(cors());

// Use environment variables for security
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Team_Panda";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Signup Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "❌ Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: "❌ Username already taken" });
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "❌ Error registering user" });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "❌ Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "❌ Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "✅ Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
