import React from "react";
import { Routes } from "react-router-dom";

export const AppRoute = () => {
  return (
    <Router>
      <PublicRoute
        exact
        path="/login"
        component={LoginPage}
        usuario={usuario}
      />

      <PrivateRoute path="/" component={PanelRoute} usuario={usuario} />
      <Navigate to="/" />
    </Router>
  );
};
