import React, { useState, useMemo } from "react";
import { Layout } from "antd";
import { Redirect, Switch } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Media from "react-media";
import Header from "./Header";
import HeaderRightContent from "./HeaderRightContent";
import Footer from "./Footer";
import RouteContext from "./RouteContext";
import SiderMenu from "~/components/SiderMenu";
import { getRoutes, getPageTitle, getDefautRedirect } from "./_utils";
import routerConfig from "~/router.config";
import { getMenuData } from "~/utils/menu";

import styles from "./BasicLayout.less";

const { Content, Sider } = Layout;

function BasicLayout({
  title = "",
  logo = "", // logo图片
  collapsible = true, // 是否可收起
  theme = "light",
  copyright = `Copyright&nbsp;&nbsp;Doly 2020`, // 底部版权信息，String | ReactNode
  routes = [],
  isMobile,
  ...restProps
}) {
  const [collapsed, setCollapsed] = useState(isMobile); // 侧边栏当前收起状态
  const { menuData, flatMenuMap } = useMemo(
    () => getMenuData(routerConfig.basic),
    []
  );
  const routeData = useMemo(() => getRoutes(routes, true), []);
  const pageTitle = getPageTitle({ routeData, ...restProps });
  const defaultRedirectView = useMemo(
    () => getDefautRedirect(routeData, menuData),
    []
  ); // 获取 / 默认路由

  let rightLayoutStyle = {};

  if (isMobile && collapsible) {
    rightLayoutStyle = { marginLeft: 0 };
  } else if (collapsed) {
    rightLayoutStyle = { marginLeft: 80 };
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} - ${title}` : title}</title>
      </Helmet>
      <RouteContext.Provider
        value={{
          ...restProps,
          menuData,
          flatMenuMap,
          routeData,
          title: pageTitle,
          collapsed,
          isMobile
        }}
      >
        <Layout>
          <Header
            title={title}
            logo={logo}
            collapsible={collapsible}
            collapsed={collapsed}
            onTrigger={() => setCollapsed(c => !c)}
            renderRightContent={() => <HeaderRightContent />}
            isMobile={isMobile}
          />
          <Layout>
            {isMobile && collapsible ? (
              <SiderMenu
                theme={theme}
                menuData={menuData}
                collapsed={collapsed}
                {...restProps}
                onCollapse={setCollapsed}
                isMobile={isMobile}
                collapsible={collapsible}
              />
            ) : (
              <Sider
                theme={theme}
                width={250}
                collapsible={collapsible}
                collapsed={collapsed}
                trigger={null}
                className={styles.sider}
              >
                <SiderMenu
                  theme={theme}
                  menuData={menuData}
                  collapsed={collapsed}
                  {...restProps}
                  onCollapse={setCollapsed}
                  isMobile={isMobile}
                  collapsible={collapsible}
                />
              </Sider>
            )}
            <Layout className={styles.rightLayout} style={rightLayoutStyle}>
              <Content className={styles.content}>
                <Switch>
                  {defaultRedirectView}
                  {routeData}
                  <Redirect to="/exception/404" />
                </Switch>
              </Content>
              <Footer copyright={copyright} />
            </Layout>
          </Layout>
        </Layout>
      </RouteContext.Provider>
    </>
  );
}

export default props => (
  <Media query={{ maxWidth: 768 }}>
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
);
