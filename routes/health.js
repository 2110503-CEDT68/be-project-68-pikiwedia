/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get system health status
 *     description: Returns the health status of the API and the MongoDB connection.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 api:
 *                   type: string
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     healthy:
 *                       type: boolean
 *               example:
 *                 success: true
 *                 api: "healthy"
 *                 database:
 *                   status: "connected"
 *                   healthy: true
 *       503:
 *         description: Service Unavailable - Database is disconnected.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthError'
 *             example:
 *               success: false
 *               api: "healthy"
 *               database:
 *                 status: "disconnected"
 *                 healthy: false
 * components:
 *   schemas:
 *     HealthError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         api:
 *           type: string
 *         database:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             healthy:
 *               type: boolean
 *       example:
 *         success: false
 *         api: "healthy"
 *         database:
 *           status: "disconnected"
 *           healthy: false
 */

const express = require("express");

const { getHealth } = require("../controllers/health");

const router = express.Router();

router.get("/", getHealth);

module.exports = router;
