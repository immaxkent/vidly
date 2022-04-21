import React, { Component } from "react";
import { Route } from "react-router-dom";
import Redirect from "./redirect";

const ProtectedRoute = ({
  path,
  user,
  element: Component,
  render,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={props => {
          if (!user) return <Redirect />;
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    </React.Fragment>
  );
};

export default ProtectedRoute;
