const mongoose = require("mongoose");

const DB_STATES = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
};

exports.getHealth = (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = DB_STATES[dbState] ?? "unknown";
    const dbHealthy = dbState === 1;

    res.status(dbHealthy ? 200 : 503).json({
        success: dbHealthy,
        api: "healthy",
        database: {
            status: dbStatus,
            healthy: dbHealthy
        }
    });
};