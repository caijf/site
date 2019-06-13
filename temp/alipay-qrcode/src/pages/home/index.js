import React, { Component } from 'react';
import { Alert, Radio } from 'antd';
import SwipeableViews from 'react-swipeable-views';

const messageKey = '_close_message_';

// 数据
const data = {
  cjf: ['qrcode-alipay-1.png', 'qrcode-alipay-2.png', 'qrcode-alipay-3.png'],
  lj: ['qrcode-alipay-1.png']
}

export default class HomePage extends Component {
  constructor(props){
    super(props);

    const visibleMessage = localStorage.getItem(messageKey) !== '1';
    const name = props.match.params && props.match.params.name && data[props.match.params.name] ? props.match.params.name : 'cjf';
    const images = data[name];

    this.state = {
      visibleMessage,
      name,
      images,
      swipeIndex: 0
    };
  }

  closeMessage=()=>{
    localStorage.setItem(messageKey, '1');

    this.setState({
      visibleMessage: false
    })
  }

  changeName=(e)=>{
    console.log(`radio checked:${e.target.value}`);

    const { history } = this.props;

    const name = e.target.value;
    const images = data[name];

    this.setState({
      name,
      images,
      swipeIndex: 0
    }, ()=>{
      history.replace(`/${e.target.value}`);
    })
  }

  render(){
    const { visibleMessage, name, images, swipeIndex } = this.state;

    return (
      <div style={{padding: '15px'}}>
        <h1>支付宝-扫码领红包({name})</h1>
        {
          visibleMessage && (
            <Alert
              message="长按图片保存至相册，打开支付宝-扫一扫，选择相册图片即可领取。"
              type="info"
              closable
              onClose={this.closeMessage}
              style={{marginBottom: '15px'}}
            />
          )
        }
        <SwipeableViews>
          {
            images.map(item=>(
              <img src={require(`../../assets/images/${name}/${item}`)} key={item} />
            ))
          }
        </SwipeableViews>
        <div style={{marginTop: '15px', height: '40px'}}>
          切换用户：
          <Radio.Group onChange={this.changeName} defaultValue={name}>
            {
              Object.keys(data).map(item=>(
                <Radio.Button key={item} value={item}>{item}</Radio.Button>
              ))
            }
          </Radio.Group>
        </div>
      </div>
    )
  }
}