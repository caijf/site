import React from "react";
import { Button } from 'antd-mobile';

import styles from './style.less';

export default class HomePage extends React.Component{

  state={
    videoSrc: "",
    videoTime: "",
    videoSize: ""
  }

  changeVideo=(e)=>{
    // console.log(e.currentTarget.files);

    const [video] = e.currentTarget.files;

    const videoSize = this.transformByte(video.size);
    const videoSrc = window.URL.createObjectURL(video);
    console.log(video);
    console.log(videoSrc);
    console.log(videoSize);
    this.setState({
      videoSize,
      videoSrc
    });
  }

  transformByte=(size)=>{
    const byte = 1024;
    const kb = byte * byte;
    const mb = kb * byte;
    const gb = mb * byte;
    const tb = gb * byte;

    let ret = '';

    if (size < byte) {
      ret = size.toFixed(2) + 'Byte';
    } else if (size < kb) {
      ret = (size / byte).toFixed(2) + 'KB';
    } else if (size < mb) {
      ret = (size / kb).toFixed(2) + 'MB';
    } else if (size < gb) {
      ret = (size / mb).toFixed(2) + 'GB';
    } else if (size < tb) {
      ret = (size / gb).toFixed(2) + 'TB';
    }

    return ret;
  }

  sumVideoTime=(e)=>{
    const { duration } = e.currentTarget;
    const hour = parseInt(duration/3600);
    const minute = parseInt((duration%3600)/60);
    const second = Math.ceil(duration%60);

    this.setState({
      videoTime: `${this.fixZero(hour)}:${this.fixZero(minute)}:${this.fixZero(second)}`
    })
  }

  fixZero=(num)=>{
    return num < 10 ? '0'+num : num+'';
  }

  render(){
    const { videoSrc, videoSize, videoTime } = this.state;

    return (
      <div className={styles.page}>
        <div className={styles.recordButton}>
          <Button type="primary">点击录制视频</Button>
          <input type="file" accept="video/*" capture="user" onChange={this.changeVideo} />
        </div>
        {
          videoSrc && videoSize && (
            <>
              <h3>视频大小</h3>
              <div>{videoSize}</div>
              <h3>视频时长</h3>
              <div>{videoTime || '-'}</div>
              <h3>预览</h3>
              <video src={videoSrc} controls="controls" onCanPlayThrough={this.sumVideoTime}></video>
            </>
          )
        }
      </div>
    )
  }
}