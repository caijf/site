import React from 'react';
import { Button } from 'antd-mobile';
import '~/utils/mediaDevices.polyfill';

import styles from './style.less';

export default class Demo2 extends React.Component {

  getUserMedia = ({ constraints }) => {
    constraints = constraints || {
      audio: true,
      video: {
        width: 1280,
        height: 720
      }
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream)=>{
this.gotMediaStream(stream);
        var video = document.querySelector('video');
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch((err)=>{
        console.log(err.name + ": " + err.message);
      });
  }

  gotMediaStream = (stream) => {
    // 拿到流后 获取到视频中所有的track 取其中第一个videotrack
    let videoTrack = stream.getVideoTracks()[0]
    console.log(videoTrack)
    // 通过 videotrack 的getsettings 拿到constrants的对象
    let videoConstraints = videoTrack.getSettings()
    console.log(videoConstraints)
  }

  render() {
    return (
      <div className={styles.page}>
        <video id="video" className={styles.video} autoPlay playsInline muted></video>
        <Button type="primary" className={styles.btn} onClick={this.getUserMedia}>打开摄像头和麦克风</Button>
      </div>
    )
  }
}