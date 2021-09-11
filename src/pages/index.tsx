import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { paths } from "shared/config";

import HomePage from "./home";

export const Routing = ({ isAuth }: { isAuth: boolean }) => {
  const renderRoutes = isAuth ? IS_AUTH_ROUTES : IS_NOT_AUTH_ROUTES;
  const rederictLink = isAuth ? "/home" : "/login";

  return (
    <Switch>
      {renderRoutes.map((route) => {
        return <Route key={route.path} {...route} />;
      })}
      <Redirect to={rederictLink} />
    </Switch>
  );
};

const IS_AUTH_ROUTES = [
  { exact: true, path: paths.home(), component: HomePage },
];

const IS_NOT_AUTH_ROUTES = [
  { exact: true, path: paths.login(), component: () => <>'login page'</> },
];
