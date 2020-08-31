import React from "react";
import { Route, Redirect } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import { isUrl } from "util-helpers";
import AuthorizedRoute from "~/components/AuthorizedRoute";
import { urlToList } from "~/utils/pathTools";

// 格式化路由path
function formatPath(path, parentPath = "/") {
  let ret = path;
  if (!isUrl(path) && path.indexOf("/") !== 0) {
    ret = parentPath + path;
  }

  return ret;
}

// 格式化路由，处理path和breakcrumb
function formatter(
  data = [],
  parentPath = "/",
  // breakcrumb = [],
  parentAuthority
) {
  let ret = [];

  data.forEach(item => {
    const pathFmt = formatPath(item.path, parentPath);
    // const currentBreakcrumb = breakcrumb.slice();

    // currentBreakcrumb.push({
    //   path: item.path,
    //   breadcrumbName: item.name || ""
    // });

    if (item.routes) {
      ret = ret.concat(
        formatter(
          item.routes,
          `${pathFmt}/`,
          // currentBreakcrumb,
          item.authority || parentAuthority
        )
      );
    } else {
      const result = {
        ...item,
        // breakcrumb: currentBreakcrumb,
        path: pathFmt
      };

      if (item.redirect) {
        result.redirect = formatPath(item.redirect, parentPath);
      }

      if (!item.authority && parentAuthority) {
        result.authority = parentAuthority;
      }

      ret.push(result);
    }
  });

  return ret;
}

// 获取路由数据
export function getRoutes(routeData, needAuthorized) {
  const ret = [];
  const routes = formatter(routeData);

  routes.forEach(page => {
    const { path, component: Component, redirect, render, ...restProps } = page;

    if (redirect) {
      ret.push(
        <Redirect key={path} from={path} to={redirect} exact {...restProps} />
      );
    } else {
      const routeComp = needAuthorized ? (
        <AuthorizedRoute
          key={path}
          path={path}
          render={props =>
            Component ? <Component {...props} /> : render({ ...props })
          }
          {...restProps}
        />
      ) : (
        <Route
          key={path}
          path={path}
          render={props =>
            Component ? <Component {...props} /> : render({ ...props })
          }
          {...restProps}
        />
      );
      ret.push(routeComp);
    }
  });

  return ret;
}

// 获取当前route信息
export function getCurrentRoute(routeData, pathname) {
  let currentRoute = null;

  routeData.some(item => {
    if (pathToRegexp(item.key).test(pathname)) {
      currentRoute = item.props;
    }
    return currentRoute;
  });

  return currentRoute;
}

// 获取页面标题
// 这里如果根据菜单获取标题会有问题，比如有些详情页的菜单是隐藏。
export function getPageTitle({ routeData, location }) {
  const { pathname } = location;
  let title = "";
  const currRoute = getCurrentRoute(routeData, pathname);
  if (currRoute && currRoute.name) {
    title = currRoute.name;
  }
  return title;
}

// 获取面包屑数据
// export function getBreadcrumb(routeData, pathname) {
//   const currRoute = getCurrentRoute(routeData, pathname);
//   return currRoute.breakcrumb;
// }
function getCurrentBreadcrumb(flatMenuMap, url) {
  let breadcrumb = flatMenuMap[url];
  if (!breadcrumb) {
    Object.keys(flatMenuMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = flatMenuMap[item];
      }
    });
  }
  return breadcrumb;
}
export function getBreadcrumb(flatMenuMap, pathname) {
  const pathSnippets = urlToList(pathname);
  const extraBreadcrumbItems = pathSnippets
    .map(url => {
      const currentBreadcrumb = getCurrentBreadcrumb(flatMenuMap, url) || {};
      const { hideInBreadcrumb, name, children } = currentBreadcrumb;
      return name && !hideInBreadcrumb
        ? {
            path: url,
            breadcrumbName: name,
            component: !children
          }
        : null;
    })
    .filter(item => item !== null);
  // // Add home breadcrumbs to your head if defined
  // if (home) {
  //   extraBreadcrumbItems.unshift({
  //     path: '/',
  //     breadcrumbName: home,
  //   });
  // }

  return extraBreadcrumbItems;
}

// 获取第一个菜单页面路由
function getMenuFirstPath(menuData) {
  let ret = "";
  if (menuData && menuData.length > 0) {
    menuData.some(item => {
      if (item.children && item.children.length > 0 && !item.hideInMenu) {
        ret = getMenuFirstPath(item.children);
      } else if (!isUrl(item.path) && item.component && !item.hideInMenu) {
        ret = item.path;
      }
      return ret;
    });
  }
  return ret;
}

// 获取默认重定向页面，如果指定路由 / 重定向或页面，则不设置；否则返回第一个菜单 path 作为重定向
export function getDefautRedirect(routeData, menuData) {
  let hasRootRedirect = false;
  let view = null;

  // 查找是否有 / 重定向
  routeData.some(item => {
    if (
      (item.props.form === "/" && !!item.props.to) ||
      item.props.path === "/"
    ) {
      hasRootRedirect = true;
    }
    return hasRootRedirect;
  });

  // 没有 / 路由配置，获取第一个菜单路由
  if (!hasRootRedirect) {
    const firstMenuPath = getMenuFirstPath(menuData);
    view = <Redirect path="/" to={firstMenuPath} exact />;
  }

  return view;
}
