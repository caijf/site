import React from "react";
import { Drawer } from "antd";
import SiderMenu from "./SiderMenu";
import { getFlatMenuKeys } from "./SiderMenuUtils";

const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse, collapsible } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile && collapsible ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      closable={false}
      style={{
        padding: 0,
        height: "100vh"
      }}
      drawerStyle={props.theme === "dark" ? { background: "#001529" } : {}}
    >
      <SiderMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
});

export default SiderMenuWrapper;
