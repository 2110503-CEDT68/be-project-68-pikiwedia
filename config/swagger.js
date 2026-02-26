const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Massage Booking API",
            version: "1.0.0",
            description: "API documentation for massage booking application"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerDocument);

module.exports = swaggerSpec;
