require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const app = express();
const authRoute = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const questionRoute = require("./routes/questionRoute");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

//middleware to handle cors
app.use(
  cors({
    origin: "https://hire-path-ten.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();
//middleware
app.use(express.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/sessions", sessionRoute);
app.use("/api/questions", questionRoute);

app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve static files from the "uploads" folder at the URL path /uploads

const port = process.env.PORT || 8000; // Changed to 8000 to avoid conflicts
app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting server:", err);
    return;
  }
  console.log(`Server is running on http://localhost:${port}`);
  console.log("CORS enabled for all origins");
});
