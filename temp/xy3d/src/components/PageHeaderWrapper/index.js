import React, { useContext } from "react";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import RouteContext from "~/layouts/RouteContext";
import { getBreadcrumb, getCurrentRoute } from "~/layouts/_utils";

import styles from "./style.less";

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender = (route, params, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;

  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

const conversionBreadcrumbList = (flatMenuMap, pathname) => {
  const routes = getBreadcrumb(flatMenuMap, pathname);
  return routes.length > 1
    ? {
        routes,
        itemRender
      }
    : {};
};

export default function PageHeaderWrapper({ children, ...restProps }) {
  const { location, flatMenuMap, title, routeData } = useContext(RouteContext);
  const route = getCurrentRoute(routeData, location.pathname);

  return (
    <div className={styles.wrapper}>
      <PageHeader
        ghost={false}
        title={title}
        breadcrumb={
          !route.hideInBreadcrumb &&
          conversionBreadcrumbList(flatMenuMap, location.pathname)
        }
        {...restProps}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
