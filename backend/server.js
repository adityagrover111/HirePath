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

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));
// Serve static files from the "uploads" folder at the URL path /uploads

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
