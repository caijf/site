import React, { PureComponent, Fragment } from "react";
import ReactDOM from "react-dom";
import { Tabs, Badge, Spin, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import classNames from "classnames";
// import { HeaderDropdown } from 'ant-design-pro';
import List from "./NoticeList";
import styles from "./index.module.less";

const { TabPane } = Tabs;

export default class NoticeIcon extends PureComponent {
  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    onViewMore: () => {},
    loading: false,
    clearClose: false,
    viewMoreClose: false,
    locale: {
      emptyText: "No notifications",
      clear: "Clear",
      viewMore: "More"
    },
    emptyImage:
      "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg",
    emptyTextClose: false
  };

  state = {
    visible: false
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    onItemClick(item, tabProps);
    if (clickClose) {
      this.popover.click();
    }
  };

  onClear = name => {
    const { onClear, clearClose } = this.props;
    onClear(name);
    if (clearClose) {
      this.popover.click();
    }
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  onViewMore = (tabProps, event) => {
    const { onViewMore, viewMoreClose } = this.props;
    onViewMore(tabProps, event);
    if (viewMoreClose) {
      this.popover.click();
    }
  };

  onClickEmptyText = () => {
    const { emptyTextClose } = this.props;
    if (emptyTextClose) {
      this.popover.click();
    }
  };

  getNotificationBox() {
    const { children, loading, locale } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      const {
        list,
        title,
        count,
        emptyText,
        emptyImage,
        showClear,
        showViewMore
      } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const localeTitle = locale[title] || title;
      const tabTitle =
        msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
      return (
        <TabPane tab={tabTitle} key={title}>
          <List
            data={list}
            emptyImage={emptyImage}
            emptyText={<div onClick={this.onClickEmptyText}>{emptyText}</div>}
            locale={locale}
            onClear={() => this.onClear(title)}
            onClick={item => this.onItemClick(item, child.props)}
            onViewMore={event => this.onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>
      );
    });
    return (
      <Fragment>
        <Spin spinning={loading} delay={0}>
          <Tabs className={styles.tabs} onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </Fragment>
    );
  }

  handleVisibleChange = visible => {
    const { onPopupVisibleChange } = this.props;
    this.setState({ visible });
    onPopupVisibleChange(visible);
  };

  static Tab = TabPane;

  render() {
    const { className, count, popupVisible, bell } = this.props;
    const { visible } = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
    const trigger = (
      <span className={classNames(noticeButtonClass, { opened: visible })}>
        <Badge
          count={count}
          style={{ boxShadow: "none" }}
          className={styles.badge}
        >
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ("popupVisible" in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <Dropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...popoverProps}
        ref={node => (this.popover = ReactDOM.findDOMNode(node))} // eslint-disable-line
      >
        {trigger}
      </Dropdown>
    );
  }
}
