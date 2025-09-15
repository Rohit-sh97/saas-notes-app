import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();


// allow frontend during dev and prod
const allowedOrigins = [
  "http://localhost:5173",   // Vite dev
  "https://saas-notes-app-jade.vercel.app" // replace with actual Vercel frontend URL later
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import tenantRoutes from "./routes/tenants.js";

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/tenants", tenantRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));
