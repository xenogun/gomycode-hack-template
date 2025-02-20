import "dotenv/config";
import express from "express";
import logger from "./config/logger.js";
import dbConnection from "./config/db.js";
import v1Router from "./routes/v1.js";
import morgan from "morgan";
import cors from "cors";
import habitRoutes from "./routes/habitRoutes.js";
// Initialize express app and set up the port and trust proxy settings.
const app = express();

const PORT = process.env.PORT || 3000;
// Set the application to trust the reverse proxy
app.set("trust proxy", true);
app.use(
    cors({
        origin: (origin, callback) => {
            return callback(null, origin); // this accepts all origins
            /*  if (origin === "http://localhost:5173") callback(null, origin);
            else callback(new Error("Invalid origin")); */
        },
        credentials: true,
    })
);
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// adding routes to the application
app.use("/api/v1", v1Router);
app.use("/api/habits", habitRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
// Database connection and server startup
dbConnection.then(() => {
    app.listen(PORT, () => {
        logger.info(`http://localhost:${PORT}`);
        logger.info(`server listening on ${PORT}`);
    });
});

process.on("SIGINT", async () => {
    logger.info("Shutting down server...");
    await dbConnection.close();
    process.exit(0);
  });