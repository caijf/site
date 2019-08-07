import React from "react";
import { Button, List } from 'antd-mobile';

import styles from './style.less';

const Item = List.Item;

const demos = [
  {
    name: 'input type="file"',
    path: '/demo1'
  },
  {
    name: 'getUserMedia 2',
    path: '/demo2'
  }
]

export default class HomePage extends React.Component{

  toPage=(url)=>{
    const { history } = this.props;
    history.push(url)
  }

  render(){
    return (
      <div>
        <List renderHeader={() => '视频录像测试'} className="my-list">
          {
            demos.map(item=>(
              <Item arrow="horizontal" key={item.path} onClick={() => {this.toPage(item.path)}}>{item.name}</Item>
            ))
          }
        </List>
      </div>
    )
  }
}