import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); // Initialize the app first

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json()); // allows us to accept JSON data in the req.body

// Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Connect to the database and start the server
connectDB(); // Connect to MongoDB before starting the server
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
});
