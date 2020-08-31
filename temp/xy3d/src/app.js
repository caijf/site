import "./global.less";
import "mobx-react-lite/batchingForReactDom";
import React from "react";
import ReactDom from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "moment";
import "moment/locale/zh-cn";
import { Router, Route, Switch } from "react-router-dom";
import { syncHistory } from "router-store";
import { HelmetProvider } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import BasicLayout from "~/layouts/BasicLayout";
import routerConfig from "~/router.config";

// import piclogo from "~/assets/images/logo@2x.png";

// layout config
const layoutConfig = {
  // logo: piclogo,
  title: "梦幻西游三维版工具箱",
  // title: "测试",
  theme: "light" // light or dark
};

// 同步history
const history = syncHistory();

const App = observer(() => {
  return (
    <HelmetProvider>
      <ConfigProvider locale={zhCN}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={props => (
                <BasicLayout
                  routes={routerConfig.basic}
                  {...layoutConfig}
                  {...props}
                />
              )}
            />
          </Switch>
        </Router>
      </ConfigProvider>
    </HelmetProvider>
  );
});

ReactDom.render(<App />, document.getElementById("root"));
