import React from "react";
import { Layout } from "antd";

import styles from "./BasicLayout.less";

const { Footer } = Layout;

export default function DefineFooter({ copyright = "" }) {
  return copyright ? (
    <Footer
      className={styles.footer}
      dangerouslySetInnerHTML={{ __html: copyright }}
    />
  ) : null;
}
