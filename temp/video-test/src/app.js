import "core-js/stable";
import "~/app.less";

import React from "react";
import ReactDom from "react-dom";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";

import routerConfig from "~/router.config";

function App() {
  return (
    <Router>
      <>
        <Switch>
          {routerConfig.map(page => (
            <Route key={`page_${page.name}`} {...page} />
          ))}
          <Redirect to="/404" />
        </Switch>
      </>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
