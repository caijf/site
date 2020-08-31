import React, { useCallback } from "react";
import { Dropdown, Menu, message } from "antd";
import { observer } from "mobx-react-lite";
// import NoticeIcon from "./NoticeIcon";
import styles from "./BasicLayout.less";

function HeaderRightContent() {
  return (
    <div className={styles.headerRightContent}>{/* <NoticeIcon /> */}</div>
  );
}

export default observer(HeaderRightContent);
