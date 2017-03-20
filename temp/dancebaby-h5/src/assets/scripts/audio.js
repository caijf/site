/**
 * 音频分享页
 * @cjf 20170320
 */

// TODO：shareUrl传过来的是什么参数？
$(function () {
    /**
     * 获取音频接口
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function getAudioInfo(id) {
        var url = '../../data/mock.getAudioInfo.js';

        return $.ajax({
            url: url
        });
    }

    getAudioInfo().then(function (res) {
        console.log('then');
        console.log(res);
        return JSON.parse(res)[0] || res;
    }).done(function (data, status, xhr) {
        console.log('done');
        console.log(data);

        setTimeout(function () {
            onResponseAudioInfo(data);
        }, 1000);

    }).fail(function (xhr, errorType, error) {
        console.log(errorType);
        console.log(error);
        alert('页面加载失败，请稍后在试！');
    });

    // audio数据请求响应之后
    function onResponseAudioInfo(res) {

        if(res.code !== 1){
            alert(res.msg);
            return;
        }

        // audio dom
        var $audioWrapper = $('#audio_wrapper'),
            $audio = $('audio'),
            $audioCoverPic = $('#audio_cover_pic'),
            $audioPlayButton = $('#audio_play_button'),
            $audioTitle = $audioWrapper.find('.audio-title'),
            $audioActor = $audioWrapper.find('.audio-actor');

        var $body = $(document.body);

            // 封面旋转class
        var audioCoverRotateClass = 'audio-spin',
            audioCoverRotatePauseClass = 'audio-pause';

            // 标识当前是否播放音频
        var isPlayAudio = false;

        hideLoading();
        render();
        $audioWrapper.show();

        // 绑定事件
        $audioPlayButton.on('click', function () {
            togglePlayAudio();
        });
        $audioCoverPic.on('click', function () {
            togglePlayAudio();
        });
        $audio.on('finish', function () {
            $audioPlayButton.show();
            pauseCoverRotate();
            isPlayAudio = false;
        });

        var timeoutIsFinish = setInterval(function () {
            if($audio.length > 0 && $audio.get(0).ended){
                clearInterval(timeoutIsFinish);
                // pauseCoverRotate();
                $audio.trigger('finish');
            }
        }, 10);

        /**
         * 渲染页面数据
         */
        function render() {
            $body.addClass('body-audio');

            $audio.attr({
                src: res.content.playUrl,
                preload: true
            });

            $audioTitle.html('— ' + res.content.title + ' —');
            $audioActor.html(res.content.singer);

            $audioCoverPic.attr('src', res.content.coverUrl).on('error', function () {
                console.log('cover pic load error');
            });
        }

        /**
         * 隐藏loading
         */
        function hideLoading() {
            $('.loading').remove();
        }

        /**
         * 播放音频
         */
        function playAudio() {
            $audioPlayButton.hide();
            $audio.get(0).play();
            startCoverRotate();
            isPlayAudio = true;
        }

        /**
         * 暂停音频
         */
        function pauseAudio() {
            $audioPlayButton.show();
            $audio.get(0).pause();
            pauseCoverRotate();
            isPlayAudio = false;
        }

        /**
         * 切换音频播放、暂停
         */
        function togglePlayAudio() {
            if(isPlayAudio){
                pauseAudio();
            }else{
                playAudio();
            }
        }

        /**
         * 开启封面旋转
         */
        function startCoverRotate() {
            if($audioCoverPic.hasClass(audioCoverRotateClass)){
                $audioCoverPic.removeClass(audioCoverRotatePauseClass);
            }else{
                $audioCoverPic.addClass(audioCoverRotateClass);
            }
        }

        /**
         * 暂停封面旋转
         */
        function pauseCoverRotate() {
            $audioCoverPic.addClass(audioCoverRotatePauseClass);
        }
    }
})