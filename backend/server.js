require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const authRoutes= require("./routes/authRoutes");
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST","PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"],

    })
);

connectDB()

//middlewares
app.use(express.json());
//Routes
app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sessionRoutes);
// app.use("/api/questions", questionRoutes);

// app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
// app.use("/api/ai/generate-questions", protect, generateConceptExplanation);

//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server runing on port ${PORT}`));

