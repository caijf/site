import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuthorized } from "~/utils/authorized";

export default function AuthorizedRoute({
  component: Component,
  render,
  authority,
  ...rest
}) {
  if (!checkAuthorized(authority)) {
    // 不能访问的页面重定向到403页面
    return <Redirect to="/exception/403" />;
  }

  return (
    <Route
      {...rest}
      render={props => (Component ? <Component {...props} /> : render(props))}
    />
  );
}
