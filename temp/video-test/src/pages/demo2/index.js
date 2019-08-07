import React from 'react';

export default class Demo2 extends React.Component {

  componentWillMount() {
    if (navigator.mediaDevices === undefined) {
      var div = document.createElement("div");
      div.innerHTML = 'mediaDevices not supported';
      document.body.appendChild(div);
    }

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720
        }
      },
        function (stream) {
          var video = document.querySelector('video');
          video.srcObject = stream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        },
        function (err) {
          alert("The following error occurred: " + err.name);
        }
      );
    } else {
      var div = document.createElement("div");
      div.innerHTML = 'getUserMedia not supported';
      document.body.appendChild(div);
      alert("getUserMedia not supported");
    }
  }

  render() {
    return (
      <div>
        <video id="video" width="640" height="480" autoPlay="" playsInline muted></video>
        <button id="snap" className="sexyButton">Snap Photo</button>
      </div>
    )
  }
}