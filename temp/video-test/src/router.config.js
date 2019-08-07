// pages
import HomePage from "~/pages/home";
import ExceptionPage from "~/pages/exception";

import Demo1 from '~/pages/demo1';
import Demo2 from '~/pages/demo2';

export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/404",
    component: ExceptionPage
  },
  {
    path: "/demo1",
    component: Demo1
  },
  {
    path: "/demo2",
    component: Demo2
  }
];
