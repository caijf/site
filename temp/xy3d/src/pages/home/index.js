import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>首页</h2>
      <Link to="/notFound">访问不存在的页面</Link>
      <br />
      <Link to="/single/two">访问没有权限的页面</Link>
    </div>
  );
}
