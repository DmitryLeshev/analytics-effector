import React from "react";

import { Routing } from "pages";
import { withProviders } from "./providers";
import { Layout } from "./layouts";

import "./index.scss";

import { modelAnalytics } from "entities/analytics";
modelAnalytics.effects.initAnalyticsFx();

const App = () => {
  const isAuth = true;
  const appStatus = true;

  return (
    <Layout isAuth={isAuth}>
      <Routing isAuth={isAuth} />
    </Layout>
  );
};

export default withProviders(App);
