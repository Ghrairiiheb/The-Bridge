import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import courseRoutes from "./routes/course.route.js";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 6000;
app.use("/api/courses", courseRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running at http://localhost:" + PORT);
});
