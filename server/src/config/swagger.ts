import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "RIOT-LOL",
      version: "1.0.0",
      description: "롤 전적 검색 사이트",
    },
    host: "localhost:5000",
    basePath: "/",
  },
  apis: ["src/routes/riot.ts"],
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
