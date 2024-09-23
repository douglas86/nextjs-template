"use client";

import SwaggerUI from "swagger-ui-react";
import { redirect } from "next/navigation";

import useAppContext from "@/hooks/useAppContext";

import "swagger-ui-react/swagger-ui.css";

const SwaggerPage = () => {
  const { user } = useAppContext();

  // when site is in development then swagger can be displayed
  const node =
    process.env.NODE_ENV === "development" ? (
      <SwaggerUI url="/api/swagger" />
    ) : null;

  // when a user not logged in or site in production
  // gets redirected to landing page
  return <>{user ? (node ? node : redirect("/")) : redirect("/")}</>;
};

export default SwaggerPage;
