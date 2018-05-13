$(function () {
  var urlRoot = 'http://modian-static.modianli.com/little-job/img/movie2';
  // http://modian-static.modianli.com/little-job/img/back1.jpg
  var indexRange = [0, 148];
  var maxLength = indexRange[1] - indexRange[0] + 1;
  // loading
  var eleContainer = document.getElementById('container');
  var eleLoading = document.getElementById('loading');
  var audios_box = document.getElementById('audios');
  // 存储预加载的DOM对象和长度信息
  var store = {
    length: 0
  };
  var audios = {
    length: 0
  }
  wx.config({
    debug: false,
    appId: '',
    timestamp: 1,
    nonceStr: '',
    signature: '',
    jsApiList: [],
  });
  // 音频序列加载
  // audio_files = [
  //   'http://modian-static.modianli.com/little-job/audio/main2.mp3',
  //   'http://modian-static.modianli.com/little-job/audio/guss.mp3',
  //   'http://modian-static.modianli.com/little-job/audio/2.mp3',
  //   'http://modian-static.modianli.com/little-job/audio/3.mp3',
  //   'http://modian-static.modianli.com/little-job/audio/4.mp3',
  //   'http://modian-static.modianli.com/little-job/audio/5.mp3',
  // ]
  //音频加载
  // for (let i = 0; i < audio_files.length; i++) {
  //   (function (i) {
  //     let audio_temp = new Audio()
  //     let arr = audio_files[i].split('/')
  //     console.log(audio_temp)
  //     audio_temp.addEventListener('canplaythrough', function () {
  //       let idname = arr[arr.length - 1].split('.')[0]
  //       audio_temp.setAttribute('id', idname)
  //       // audio_temp.setAttribute('preload', 'auto')
  //       if (audio_temp.getAttribute('id') === 'guss') {
  //         audio_temp.setAttribute('loop', 'loop')
  //       }
  //       audios.length++;
  //       audios[i] = audio_temp
  //       play()
  //     }, false);
  //     audio_temp.src = audio_files[i]
  //   })(i)
  // }
  // 图片序列预加载
  for (var start = indexRange[0]; start <= indexRange[1]; start++) {
    (function (index) {
      let img = new Image();
      img.onload = function () {
        store.length++;
        // 存储预加载的图片对象
        store[index] = this;
        play();
      };
      img.onerror = function () {
        store.length++;
        play();
      };
      let midname
      let string_index = index + ''
      if (string_index.length === 1) {
        midname = '/LZL_0000'
      }
      if (string_index.length === 2) {
        midname = '/LZL_000'
      }
      if (string_index.length === 3) {
        midname = '/LZL_00'
      }
      img.src = urlRoot + midname + index + '.png';
    })(start);
  }


  var playTotalTime = 15500,
    playSpeed = parseInt(playTotalTime/maxLength, 10);

  var eleLoadingInner = eleLoading.getElementsByClassName('loading-inner')[0];

  var play = function () {
    // loading进度
    // var percent = Math.round(100 * (store.length + audios.length) / (maxLength + 6));
    var percent = Math.round(100 * store.length / maxLength);
    eleLoading.setAttribute('data-percent', percent);
    eleLoadingInner.style.width = percent + '%';
    // 全部加载完毕，无论成功还是失败
    if (percent == 100) {
      // for (let audio_i = 0; audio_i < audios.length; audio_i++) {
      //   audios_box.append(audios[audio_i])
      // }
      var index = indexRange[0];
      eleContainer.innerHTML = '';
      // 依次append图片对象
      var step = function () {
        if (store[index - 1]) {
          eleContainer.removeChild(store[index - 1]);
        }
        if (!eleContainer.append) {
          eleContainer.appendChild(store[index]);
        }else{
          eleContainer.append(store[index]);
        }
        // 序列增加
        index++;
        // 如果超过最大限制
        if (index <= indexRange[1]) {
          setTimeout(step, playSpeed);
        } else {
          document.getElementById('main2').pause();

          // 本段播放结束回调
          // 我这里就放一个重新播放的按钮
          // eleContainer.insertAdjacentHTML('beforeEnd', '<button onclick="play()">再看一遍英姿</button>');
          wx.ready(function () {
            setTimeout(() => {
              $('.container').css('display', 'none')
              document.getElementById('guss').play()
              $('.guss .guss_word').addClass('slide-in')
              setTimeout(() => {
                $('.guss').css('display','none');
                document.getElementById('ring').play()
              }, 2000);
            }, 2000);
          })
        }
      };
      // 等100%动画结束后执行播放
      wx.ready(function () {
        // document.getElementById('ring').play()
        // document.getElementById('ring').pause()
        // document.getElementById('guss').play()
        // document.getElementById('guss').pause()

        var audio_eles = document.getElementsByTagName('audio');

        for (var i = audio_eles.length - 1; i >= 0; i--) {
          audio_eles[i].play();
          audio_eles[i].pause();
        }

        document.getElementById('main2').play()
        setTimeout(step, 100);
      })
    }
  };





  var touchstart = false;
  var x, distance
  var rem = parseFloat($('html').css('font-size'))
  var o_left = parseFloat($('.slider').css('left'))
  var boxwidth = parseFloat($('.slide-box').css('width'))
  var sliderwidth = parseFloat($('.slider').css('width'))
  var max_left = boxwidth - sliderwidth - o_left
  var position_now = o_left
  var disableTab = true
  // var o_cover_width = parseFloat($('.slider-cover').css('width'))
  // var cover_width = o_cover_width
  $('.h5container').on('touchstart', '.slider', function (e) {
    touchstart = true;
    x = e.changedTouches[0].screenX
  })
  $('.h5container').on('touchmove', function (e) {
    if (touchstart === true) {
      var move = e.changedTouches[0].screenX - x
      position_now = position_now + move
      // cover_width += move
      if (position_now < o_left) {
        position_now = o_left
        // cover_width = o_cover_width;
      }
      if (position_now > max_left) {
        position_now = max_left
        // cover_width = boxwidth;
      }
      $('.slider').css('left', position_now + 'px')
      // $('.slider-cover').css('width', cover_width + 'px')
      x = e.changedTouches[0].screenX
    }
  })
  $('.h5container').on('touchend', function (e) {
    if (touchstart === true) {
      distance = position_now - o_left
      if (distance > (boxwidth - sliderwidth) / 2) {
        position_now = max_left
        // cover_width = boxwidth
        $('.slider').animate({ left: position_now + 'px' }, 100, 'ease-out')
        // $('.slider-cover').animate({ width: cover_width + 'px' }, 100, 'ease-out')
        $('.cover-slide').animate({ opacity: 0 }, 100, function () {
          $('.cover-slide').css('display', 'none')
          $('.word').animate({ opacity: 1 }, 100, 'ease-in')
          document.getElementById('ring').setAttribute('loop','none');
          document.getElementById('ring').pause();
          document.getElementById('enter').play();
          setTimeout(() => {
            $('.back1').css('display','none')
            $('.word').css('display','block')
            disableTab = false
          }, 6000);
        })
      }
      if (distance < (boxwidth - sliderwidth) / 2) {
        position_now = o_left
        // cover_width = o_cover_width
        $('.slider').animate({ left: position_now + 'px' }, 100, 'ease-out')
        // $('.slider-cover').animate({ width: cover_width + 'px' }, 100, 'ease-out')
      }
      touchstart = false;
    }
  })
  var o_id
  function musicplay (id) {
    if(o_id){
      musicpause(o_id)
      musicreset(o_id)
    }
    document.getElementById(id).play()
    o_id = id
  }

  function musicpause(id) {
    document.getElementById(id).pause()
  }

  function musicreset(id) {
    document.getElementById(id).currentTime = 0
  }

  // transform 转换
  function getTransform(tr, value) {
    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];
    var scale = Math.sqrt(a * a + b * b);
    // arc sin, convert from radians to degrees, round
    // DO NOT USE: see update below
    var sin = b / scale;
    var radians = Math.atan2(b, a);
    if (radians < 0) {
      radians += (2 * Math.PI);
    }
    var angle = Math.round(radians * (180 / Math.PI));
    if (value === 'scale') return scale
    if (value === 'rotate') return angle
  }
  //生成产品dom
  var template = ''
  for (let index = 1; index < 12; index++) {
    // todo: change link
    // <img src="http://modian-static.modianli.com/little-job/img/` + index + `.png" alt="">
    template = template + '<div class="single"><img src="./img/static/' + index + '.png" alt=""></div>'.trim()
  }
  $('.gifts').html(template)
  // 获取初始值
  var deg = 36
  var o_selected = 1 // 1-10
  var keeproll = false
  var animateStop = true
  var cannotTab = false

  var moonIsLight = false;

  var nowplay
  function getNum(text) {
    var value = text.replace(/[^0-9]/ig, "");
    return value;
  }
  var o_deg = getTransform($('.gifts').css('transform'), 'rotate')
  // console.log(o_deg)
  function showdetail (index) {
    let classname_d = '.detail_'+index
    $('.showbox img').css('display','none')
    $(classname_d).css('display','block')
  }
  function roll(target_index) {
    if (keeproll) {
      animateStop = false
      // $('.gifts').animate({ rotate: 360 + o_deg + 'deg' }, 1000, 'linear', function () {
      //   $('.gifts').css('transform', 'rotate(' + o_deg + 'deg)')
      //   console.log($('.gifts').css('transform'))
      //   roll(target_index)
      // })
      $('.gifts').animate({ rotate: 360 + o_deg + 'deg' }, 1000, 'linear', function () {
        $('.gifts').animate({ rotate: o_deg + 'deg' }, 0, 'linear', function () {
          roll(target_index)
        })
      })
    } else {
      let angle = 32.7 * (target_index-1) + o_deg
      $('.gifts').animate({ rotate: angle + 'deg' }, angle === o_deg ? 100 : 2000, 'linear', function () {
        o_selected = target_index-1
        musicplay(target_index + '')
        showdetail(target_index + '')

        if(moonIsLight){
          $('.moon').removeClass('active');
          moonIsLight = false;
        }

        $('.gifts .single').eq(o_selected).animate({ 'padding': '0px' }, 100,'linear',function (){
          animateStop = true
        })
      })
    }
  }
  $('.touchme').tap(function (e) {
    e.preventDefault();
    $('.showbox img').css('display','none')
    if (keeproll === false && !disableTab&& animateStop) {

      if(moonIsLight){
        $('.moon').removeClass('active');
        moonIsLight = false;
      }
      if(o_id){
        musicpause(o_id)
        musicreset(o_id)
      }

      $('.gifts .single').animate({ 'padding': '0.6667rem 0.6667rem 0px 0.6667rem' }, 100)
      let a = parseInt(Math.random() * 11) +1
      keeproll = true
      roll(a)
      setTimeout(() => {
        keeproll = false;
      }, 1000);
    }
    // if (!disableTab) {
    //   $('.gifts .single').eq(o_selected).animate({ 'padding': '0.6667rem 0.6667rem 0px 0.6667rem' }, 100)
    // }
  })

  $('.lightme').tap(function (e) {
    e.preventDefault();
    $('.moon').addClass('active');
    $('.showbox img').css('display','none')
    $('.gifts .single').animate({ 'padding': '0.6667rem 0.6667rem 0px 0.6667rem' }, 100)

    if(!moonIsLight){
      musicplay('light')
    }

    moonIsLight = true;
    // console.log(document.getElementById('light'))
  })
})