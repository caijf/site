import React from "react";
import { Icon } from "antd";
import {
  HomeOutlined,
  FileDoneOutlined,
  SubnodeOutlined,
  WechatOutlined,
  CoffeeOutlined,
  OneToOneOutlined,
  ToolOutlined,
  HeartOutlined
} from "@ant-design/icons";

// pages
import Exception403 from "~/pages/exception/403";
import Exception404 from "~/pages/exception/404";
import Exception500 from "~/pages/exception/500";

// import Home from "~/pages/home";
// import Welcome from "~/pages/welcome";

import Tiku from "~/pages/tiku";
import Yiwen from "~/pages/yiwen";
import Shenhaixunbao from "~/pages/shenhaixunbao";
import Shuxingshuoming from "~/pages/shuxingshuoming";
import Xiaojiqiao from "~/pages/xiaojiqiao";
import YYS from "~/pages/yys";

// 这里为什么不使用 Layout，因为会有循环引用问题。比如 BasicLayout 依赖 menu，menu 依赖 routes，routes 依赖 BasicLayout
//
// 图标请使用 @ant-design/icons 引入的组件（https://ant.design/components/icon-cn/），或 图片地址。

export default {
  // 以下页面需要登录、权限，使用 BasicLayout 布局
  basic: [
    // {
    //   path: "home",
    //   name: "首页",
    //   icon: <HomeOutlined />,
    //   component: Home
    // },
    {
      path: "tiku",
      name: "科举答题器",
      icon: <FileDoneOutlined />,
      component: Tiku
    },
    {
      path: "xiaojiqiao",
      name: "小技巧",
      icon: <CoffeeOutlined />,
      component: Xiaojiqiao
    },
    {
      path: "yys",
      name: "痒痒鼠宝典",
      icon: <WechatOutlined />,
      component: YYS
    },
    {
      path: "todo",
      name: "整理中",
      icon: <ToolOutlined />,
      routes: [
        {
          path: "yiwen",
          name: "逸闻",
          icon: <SubnodeOutlined />,
          component: Yiwen
        },
        {
          path: "shenhaixunbao",
          name: "深海寻宝",
          icon: <SubnodeOutlined />,
          component: Shenhaixunbao
        },
        {
          path: "shuxingshuoming",
          name: "属性说明",
          icon: <SubnodeOutlined />,
          component: Shuxingshuoming
        },
        {
          path: "fuben",
          name: "副本说明",
          icon: <SubnodeOutlined />,
          component: Shuxingshuoming
        }
      ]
    },
    {
      path: "exception",
      hideInMenu: true,
      routes: [
        {
          path: "403",
          name: "403",
          component: Exception403
        },
        {
          path: "404",
          name: "404",
          component: Exception404
        },
        {
          path: "500",
          name: "500",
          component: Exception500
        }
      ]
    }
  ]
};
