import React from "react";
import { Tag } from "antd";
import NoticeIcon from "~/components/NoticeIcon";

const data = [
  {
    id: "000000001",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "你收到了 14 份新周报",
    datetime: "2017-08-09",
    type: "notification"
  },
  {
    id: "000000002",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "你推荐的 曲妮妮 已通过第三轮面试",
    datetime: "2017-08-08",
    type: "notification"
  },
  {
    id: "000000003",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
    title: "这种模板可以区分多种通知类型",
    datetime: "2017-08-07",
    read: true,
    type: "notification"
  },
  {
    id: "000000004",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png",
    title: "左侧图标用于区分不同的类型",
    datetime: "2017-08-07",
    type: "notification"
  },
  {
    id: "000000005",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "内容不要超过两行字，超出时自动截断",
    datetime: "2017-08-07",
    type: "notification"
  },
  {
    id: "000000006",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
    title: "曲丽丽 评论了你",
    description: "描述信息描述信息描述信息",
    datetime: "2017-08-07",
    type: "message",
    clickClose: true
  },
  {
    id: "000000007",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
    title: "朱偏右 回复了你",
    description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
    datetime: "2017-08-07",
    type: "message",
    clickClose: true
  },
  {
    id: "000000008",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg",
    title: "标题",
    description: "这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像",
    datetime: "2017-08-07",
    type: "message",
    clickClose: true
  },
  {
    id: "000000009",
    title: "任务名称",
    description: "任务需要在 2017-01-12 20:00 前启动",
    extra: "未开始",
    status: "todo",
    type: "event"
  },
  {
    id: "000000010",
    title: "第三方紧急代码变更",
    description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
    extra: "马上到期",
    status: "urgent",
    type: "event"
  },
  {
    id: "000000011",
    title: "信息安全考试",
    description: "指派竹尔于 2017-01-09 前完成更新并发布",
    extra: "已耗时 8 天",
    status: "doing",
    type: "event"
  },
  {
    id: "000000012",
    title: "ABCD 版本发布",
    description: "冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务",
    extra: "进行中",
    status: "processing",
    type: "event"
  }
];

function onItemClick(item, tabProps) {
  // eslint-disable-next-line
  console.log(item, tabProps);
}

function onClear(tabTitle) {
  // eslint-disable-next-line
  console.log(tabTitle);
}

function getNoticeData(notices) {
  if (notices.length === 0) {
    return {};
  }
  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: "",
        processing: "blue",
        urgent: "red",
        doing: "gold"
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });
  return newNotices.reduce((prev, curr) => {
    if (!prev[curr.type]) {
      // eslint-disable-next-line
      prev[curr.type] = [];
    }
    prev[curr.type].push(curr);
    return prev;
  });
}

const noticeData = getNoticeData(data);

// ref: https://v2-pro.ant.design/components/notice-icon-cn
export default function NoticeIconDemo() {
  return (
    <NoticeIcon
      count={5}
      onItemClick={onItemClick}
      onClear={onClear}
      className="notice-icon"
      locale={{
        emptyText: "没有新通知",
        clear: "全部已读",
        viewMore: "查看更多"
      }}
      viewMoreClose
      emptyTextClose
      clearClose
    >
      <NoticeIcon.Tab
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        showViewMore
      />
      <NoticeIcon.Tab
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.event}
        title="待办"
        emptyText="你已完成所有待办"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        showViewMore
        showClear={false}
      />
    </NoticeIcon>
  );
}
