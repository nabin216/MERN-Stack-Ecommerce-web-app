
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import { fileURLToPath } from 'node:url'; // Correct import statement
import path from 'node:path';

// Configure env
dotenv.config();

// Database config
connectDB();

// ES module fix
const __filename = fileURLToPath(import.meta.url); // Corrected variable name
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use(express.static(path.join(__dirname, './client/build')));

// Rest API
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.js'));
});

// PORT
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
