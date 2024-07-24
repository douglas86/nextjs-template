import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next.js API",
      version: "1.0.0",
    },
  },
  apis: ["./app/api/**/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
