import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Exception from "~/components/Exception";

const Exception500 = props => (
  <Exception
    type="500"
    linkElement={Link}
    backText="返回首页"
    actions={
      <>
        <Button onClick={() => props.history.goBack()}>返回上一页</Button>
        <Link to="/">
          <Button type="primary">回到首页</Button>
        </Link>
      </>
    }
  />
);

export default Exception500;
