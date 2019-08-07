import React from 'react';
import '~/utils/mediaDevices.polyfill';

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
      .then(function (stream) {
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
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  }

  render() {
    return (
      <div>
        <video id="video" width="640" height="480" autoPlay="" playsInline muted></video>
        <button onClick={this.getUserMedia}>Snap Photo</button>
      </div>
    )
  }
}