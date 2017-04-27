/**
 * 音频分享页
 * @cjf 20170320
 */

// TODO：shareUrl传过来的是什么参数？
$(function () {

    var queryId = Util.query.id ? Util.query.id : '',
        serverUrl = Util.serverUrl;

    var defaultCoverUrl = './src/images/default_120x120.png';

    /**
     * 获取音频接口
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function getAudioInfo(id) {
        var url = serverUrl + '/app/bdaudio/audioInfo?id=' + id;

        return $.ajax({
            url: url
        });
    }

    // 顶部banner关闭事件
    $('.fixed-top-banner .ico-close').on('click', function (e) {
        $(this).parents('.fixed-top-banner').remove();
    });

    getAudioInfo(queryId).then(function (res) {
        return res;
    }).done(function (data, status, xhr) {
        onResponseAudioInfo(data);

    }).fail(function (xhr, errorType, error) {
        // alert('页面加载失败，请稍后再试！');
        onError();
    });

    function onError() {
        $('.loading').remove();
        $('body').append('<p class="tip-error">加载失败，请稍后再试！</p>');
    }

    // audio数据请求响应之后
    function onResponseAudioInfo(res) {

        if(res.code !== 1 || !res.content || !res.content.media){
            // alert('加载失败，请稍后再试!');
            // return;
            onError();
            return;
        }

        var media = res.content.media,
            shareInfo = res.content.shareInfo;

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
                src: media.audioUrl,
                preload: true
            });

            $audioTitle.html('— ' + media.title + ' —');
            $audioActor.html(media.actor ? media.actor : '');

            if(media.audioCoverUrl){
                var img = new Image();
                img.src = media.audioCoverUrl;
                img.onload = function(){
                    $audioCoverPic.attr('src', media.audioCoverUrl);
                }
                img.onerror = function () {
                    $audioCoverPic.attr('src', defaultCoverUrl);
                }
            }else{
                $audioCoverPic.attr('src', defaultCoverUrl);
            }
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
        
        /**
         * 处理微信分享图片
         * @return {[type]} [description]
         */
        function handleWXShareIcon() {
            $('body').prepend('<div style="display: none;"><img src="'+ shareInfo.imageUrl +'" /></div>');
        }

        document.title = shareInfo.title;
        render();
        handleWXShareIcon();
        hideLoading();
        $audioWrapper.show();
    }
})