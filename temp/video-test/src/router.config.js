// pages
import HomePage from "~/pages/home";
import ExceptionPage from "~/pages/exception";

export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/404",
    component: ExceptionPage
  }
];
