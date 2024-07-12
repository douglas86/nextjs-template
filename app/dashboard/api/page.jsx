import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Api = () => {
  return (
    <SwaggerUI
      url="https://petstore.swagger.io/v2/swagger.json"
      version="5.0.0"
      displayOperationId={true}
    />
  );
};

export default Api;
