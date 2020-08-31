import React from "react";
import { Divider, Card } from "antd";
import PageHeaderWrapper from "~/components/PageHeaderWrapper";
import imageDyt01 from "~/assets/images/dyt01.jpg";

export default () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Divider orientation="left">一、快速跳到大雁塔顶</Divider>
        <ol>
          <li>依次点击右侧功能“行游录-行历-回顾-第一回 万鬼长安”</li>
          <li>找到紧挨着上边俩视频中，靠下的哪一个（如下图）</li>
          <li>点击播放视频之后观看或者直接跳过就直接被祥云送到大雁塔顶端了</li>
        </ol>
        <img src={imageDyt01} alt="" />

        <Divider orientation="left">二、跑商路线</Divider>
        <ol>
          <li>大唐国境 —&gt; 长寿村/宝象国</li>
          <li>长寿村 &lt;—&gt; 宝象国</li>
        </ol>
        <p>
          平均5～7分钟一票。一般从大唐国境到长寿村就能完成。如果不行，就从长寿村到宝象国来回倒一次就可以（两地距离非常近）。
        </p>
      </Card>
    </PageHeaderWrapper>
  );
};
