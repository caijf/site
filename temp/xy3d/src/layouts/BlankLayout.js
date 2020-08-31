import React, { useMemo } from "react";
import { Redirect, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import { getRoutes, getPageTitle } from "./_utils";

import styles from "./BlankLayout.less";

export default function BlankLayout({ routes, title, logo, ...restProps }) {
  const routeData = useMemo(() => getRoutes(routes, true), []);
  const pageTitle = getPageTitle({ routeData, ...restProps });

  return (
    <>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} - ${title}` : title}</title>
      </Helmet>
      <Header title={title} logo={logo} className={styles.header} />
      <Switch>
        {routeData}
        <Redirect to="/user/login" />
      </Switch>
    </>
  );
}
