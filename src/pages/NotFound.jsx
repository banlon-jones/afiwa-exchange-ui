import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../common/routes";

const NotFound = () => {
  return (
    <div
      style={{
        height: "70vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Not Found</h1>
      <small>The page you are looking for is not found</small>
      <NavLink to={routes.home}>Go to home page</NavLink>
    </div>
  );
};

export default NotFound;
