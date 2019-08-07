import '~/utils/mediaDevices.polyfill';

import React from 'react';
import { Button, Flex, Toast } from 'antd-mobile';

import styles from './style.less';

export default class Demo2 extends React.Component {

  state = {
    started: false,
    opened: false,
    videoSrc: "",
    videoSize: "",
    videoTime: ""
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

  openCamera = () => {
    return this.getUserMedia()
      .then((stream) => {
        this.mediaStream = stream;

        this.setState({
          opened: true
        }, () => {
          const video = document.querySelector('#video');
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // 防止在新的浏览器里使用它，应为它已经不再支持了
            video.src = window.URL.createObjectURL(stream);
          }
          video.onloadedmetadata = (e) => {
            video.play();
          };
        });

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
    if (typeof MediaRecorder !== 'undefined') {
      // 通过 MediaRecorder 记录获取到的媒体流
      this.mediaRecorder = new MediaRecorder(this.mediaStream);

      // let chunks = [];
      // this.mediaRecorder.blobs = [];

      let buffers = null;

      this.mediaRecorder.ondataavailable = function (e) {
        // this.mediaRecorder.blobs.push(e.data);
        // chunks.push(e.data);

        //收集媒体设备获得到的可以使用的数据
        console.log(e.data);
        buffers = e.data;
      };

      this.mediaRecorder.onstop = (e) => {
        // this.recorderFile = new Blob(chunks, { 'type': this.mediaRecorder.mimeType });
        // chunks = [];

        const videoSrc = URL.createObjectURL(buffers);
        const videoSize = this.transformByte(buffers.size);

        this.setState({
          videoSrc,
          videoSize
        }, () => {
          const video = document.querySelector('#video2');
          this.formatePlayerDuration(video);
        });

        if (this.stopRecordCallback && typeof this.stopRecordCallback === 'function') {
          this.stopRecordCallback();
        }
      }

      // 开始录制
      this.mediaRecorder.start();

      this.setState({
        started: true
      });
    } else {
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

  transformByte = (size) => {
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

  updateDuration=(duration)=>{
    console.log(duration);
    const hour = parseInt(duration / 3600);
    const minute = parseInt((duration % 3600) / 60);
    const second = Math.ceil(duration % 60);

    this.setState({
      videoTime: `${this.fixZero(hour)}:${this.fixZero(minute)}:${this.fixZero(second)}`
    })
  }

  fixZero = (num) => {
    return num < 10 ? '0' + num : num + '';
  }

  formatePlayerDuration=(media)=>{
    const self = this;
    media.onloadedmetadata = e => {
      const audio = e.target;
      const audioDuration = audio.duration;
      if (audioDuration === Infinity) {
        audio.currentTime = 1e101;
        audio.ontimeupdate = function () {
          this.ontimeupdate = () => {
            return;
          };
          // 不重新设置currtTime,会直接触发audio的ended事件，因为之前将currentTime设置成了一个比音频时长还大的值。所以要将currentTime重置为初始状态。
          // 注: 这里有一个问题，直接设置为0 是不起作用的。需要重新设置一下audio.currentTime = 1e101;然后再设置为0
          audio.currentTime = 1e101;
          audio.currentTime = 0;

          self.updateDuration(media.duration);
        };
      }
    };
  }

  render() {
    const { started, opened, videoSrc, videoSize, videoTime } = this.state;

    return (
      <div className={styles.page}>
        <Flex>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.openCamera} disabled={opened}>打开摄像头</Button>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.startRecord} disabled={!opened || started || videoSrc}>{started ? '录制中':'开始录制'}</Button>
          </Flex.Item>
          <Flex.Item>
            <Button type="primary" className={styles.btn} size="small" onClick={this.stopRecord} disabled={!opened || !started}>结束录制</Button>
          </Flex.Item>
        </Flex>
        {
          (!videoSrc || !videoSize) && opened && (
            <video id="video" className={styles.video} autoPlay playsInline muted></video>
          )
        }
        {
          videoSrc && videoSize && (
            <>
              <h3>视频大小</h3>
              <div>{videoSize}</div>
              <h3>视频时长</h3>
              <div>{videoTime || '-'}</div>
              <h3>预览</h3>
              <video id="video2" className={styles.video} src={videoSrc} controls="controls"></video>
            </>
          )
        }
      </div>
    )
  }
}