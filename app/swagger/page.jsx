"use client";

import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";
import useAppContext from "@/hooks/useAppContext";

const SwaggerPage = () => {
  const { user } = useAppContext();

  const node =
    process.env.NODE_ENV === "development" ? (
      <SwaggerUI url="/api/swagger" />
    ) : null;

  return <>{user && node}</>;
};

export default SwaggerPage;
