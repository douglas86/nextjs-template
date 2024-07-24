import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next.js API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "number",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User name",
            },
            createdAt: {
              type: "date",
              description: "User created date",
            },
          },
        },
      },
    },
  },
  apis: ["./app/api/**/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
