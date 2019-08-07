import '~/utils/mediaDevices.polyfill';

import React from 'react';
import { Button, Flex, Toast } from 'antd-mobile';

import styles from './style.less';

export default class Demo2 extends React.Component {

  state = {
    started: false,
    opened: false
  }

  getUserMedia = (constraints) => {
    constraints = constraints || {
      audio: true,
      video: true
    };

    return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  }

  /**
  * 关闭媒体流
  * @param stream {MediaStream} - 需要关闭的流
  */
  closeStream = (stream) => {
    if (typeof stream.stop === 'function') {
      stream.stop();
    }
    else {
      let trackList = [stream.getAudioTracks(), stream.getVideoTracks()];

      for (let i = 0; i < trackList.length; i++) {
        let tracks = trackList[i];
        if (tracks && tracks.length > 0) {
          for (let j = 0; j < tracks.length; j++) {
            let track = tracks[j];
            if (typeof track.stop === 'function') {
              track.stop();
            }
          }
        }
      }
    }
  }

  openCamera=()=>{
    return this.getUserMedia()
      .then((stream) => {
        this.mediaStream = stream;

        const video = document.querySelector('video');
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = (e) => {
          video.play();

          this.setState({
            opened: true
          });
        };

        return stream;
      })
      .catch((err) => {
        // const errMap = {
        //   'AbortError': '中止错误',
        //   'NotAllowedError': '拒绝错误',
        //   'NotFoundError': '找不到错误',
        //   'NotReadableError': '无法读取错误',
        //   'OverConstrainedError': '无法满足要求错误',
        //   'SecurityError': '安全错误',
        //   'TypeError': '类型错误'
        // }

        Toast.info(`${err.name + ": " + err.message}`);
        console.log(err.name + ": " + err.message);
        return err;
      })
  }

  startRecord = () => {
    if(typeof MediaRecorder !== 'undefined'){
      // 通过 MediaRecorder 记录获取到的媒体流
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
  
      let chunks = [];
  
      this.mediaRecorder.ondataavailable = function (e) {
        this.mediaRecorder.blobs.push(e.data);
        chunks.push(e.data);
      };
      this.mediaRecorder.blobs = [];
  
      this.mediaRecorder.onstop = function (e) {
        this.recorderFile = new Blob(chunks, { 'type': this.mediaRecorder.mimeType });
        chunks = [];
        if (this.stopRecordCallback && typeof this.stopRecordCallback === 'function') {
          this.stopRecordCallback();
        }
      }
  
      // 开始录制
      this.mediaRecorder.start();
  
      this.setState({
        started: true
      });
    }else{
      Toast.fail('浏览器不支持 MediaRecorder');
    }
  }

  stopRecord = (cb) => { 
    this.stopRecordCallback = cb;
    this.mediaRecorder.stop();
    this.closeStream(this.mediaStream);

    this.setState({
      started: false
    });
  }

  render() {
    const { started, opened } = this.state;

    return (
      <div className={styles.page}>
        <video id="video" className={styles.video} autoPlay playsInline muted></video>
        <Flex>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.openCamera} disabled={opened}>打开摄像头</Button>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.startRecord} disabled={!opened || started}>开始录制</Button>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.stopRecord} disabled={!opened || !started}>结束录制</Button>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}