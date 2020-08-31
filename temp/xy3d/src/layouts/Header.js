import React from "react";
import { Layout, Affix } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./BasicLayout.less";

const { Header } = Layout;

const noop = () => {};

/**
 * 头部
 *
 * @param {Object} props
 * @param {Boolean} [props.fixed=true] 是否固定头部
 * @param {Boolean} [props.collapsed=false] 当前收起状态
 * @param {Boolean} [props.collapsible=false] 是否可收起
 * @param {Boolean} [props.fixed=true] 是否固定头部
 * @param {Function} [props.onTrigger=()=>{}] 点击收起回调方法
 * @param {Function} [props.onTrigger=()=>{}] 点击收起回调方法
 * @param {Function} [props.renderRightContent=()=>null] 渲染头部右侧内容
 * @param {Object} [props.style={}] 头部样式
 */
export default function DefineHeader({
  collapsed = false,
  collapsible = false,
  onTrigger = noop,
  logo = "",
  title = "",
  renderRightContent = () => null,
  className = {},
  isMobile = false
}) {
  const headerStyle = classnames([styles.header, className]);

  const view = (
    <Header className={headerStyle}>
      <Link
        to="/"
        className={styles.logo}
        style={!collapsed && (!isMobile || !collapsible) ? {} : { width: 80 }}
      >
        {logo ? (
          <div className={styles.logoImageWrapper}>
            <img src={logo} alt="logo" className={styles.logoImage} />
          </div>
        ) : null}
        <h1 className={styles.title}>{title}</h1>
      </Link>
      {collapsible ? (
        <span
          className={styles.trigger}
          onClick={() => {
            onTrigger(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
      ) : null}
      {renderRightContent && renderRightContent()}
    </Header>
  );

  return <Affix>{view}</Affix>;
}
