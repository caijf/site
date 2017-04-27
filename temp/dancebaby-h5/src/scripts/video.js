/**
 * 视频分享页
 * @cjf 20170320
 */

/**
 * 转换数字为单位“万”
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function convertToUnitTenThousand(num) {
    var ret = num;
    if(num > 10000){
        ret = (num / 10000).toFixed(2) + '万';
    }

    return ret;
}

// TODO：shareUrl传过来的是什么参数？
$(function () {

    var queryId = Util.query.id ? Util.query.id : '',
        serverUrl = Util.serverUrl;

    /**
     * 获取视频接口
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function getVideoInfo(id) {
        var url = serverUrl + '/app/bdvideo/getVideoInfo?video_id=' + id;

        return $.ajax({
            url: url
        });
    }

    // 检测唤起app
    Util.checkWithOpenApp('video?id=' + queryId);

    // 顶部banner关闭事件
    $('.fixed-top-banner .ico-close').on('click', function (e) {
        $(this).parents('.fixed-top-banner').remove();
    });

    getVideoInfo(queryId).then(function (res) {
        return res;
    }).done(function (data, status, xhr) {
        onResponseVideoInfo(data);
    }).fail(function (xhr, errorType, error) {
        // alert('数据加载失败，请稍后在试！');
        onError();
    });

    function onError() {
        $('.loading').remove();
        $('body').append('<p class="tip-error">加载失败，请稍后再试！</p>');
    }

    function onResponseVideoInfo(res) {

        if(res.code !== 1 || !res.content || !res.content.media){
            // alert('加载失败，请稍后再试!');
            // return;
            onError();
            return;
        }

        var resContent = res.content,
            media = resContent.media,
            shareInfo = resContent.shareInfo;
        
        //----------- uploader
        var $uploaderWrapper = $('#uploader_wrapper'),
            $uploaderName = $uploaderWrapper.find('.uploader-name'),
            $uploaderHeadPic = $uploaderWrapper.find('.uploader-headpic img'),
            $uploaderCreateTime = $uploaderWrapper.find('.uploader-createtime'),
            $uploaderPlayTotal = $uploaderWrapper.find('.uploader-play-total');

        // $uploaderHeadPic.attr('src', media.publisherHeadPic);
        $uploaderHeadPic.attr('src', './src/images/headpic.png');
        $uploaderName.html(media.publisher || '蓝舞者官方微博');
        $uploaderCreateTime.html(new Date(media.createTime).Format('MM-dd hh:mm'));
        $uploaderPlayTotal.html(media.playNum ? '<i class="icon-play-small"></i>' + convertToUnitTenThousand(media.playNum) + '次播放' : '');

        //----------- video
        var $videoWrapper = $('#video_wrapper'),
            $video = $('#video'),
            $videoMask = $('#video_mask'),
            $videoPlayButton = $('#video_play_button'),
            $videoTitle = $videoWrapper.find('.video-title'),
            $videoDescription = $videoWrapper.find('.video-description'),
            $videoTag = $videoWrapper.find('.video-tags');

        // 标签内容
        var tagsHtml = '';
        for(var i = 0, len = media.tags.length; i < len; i++){
            tagsHtml += '<a href="javascript:;" class="openapp-action">#' + media.tags[i].text + '#</a>';
        }

        $video.attr({
            src: media.videoUrl,
            preload: true
        });
        $videoTitle.html(media.title);
        $videoDescription.html(media.description);
        $videoTag.html(tagsHtml);

        // 点击播放按钮
        $videoPlayButton.on('click', function () {
            playVideo();
        });
        $videoMask.on('click', function () {
            playVideo();
        });

        /**
         * 播发视频
         */
        function playVideo() {
            $video.attr('controls', 'controls');
            $videoPlayButton.hide();
            $videoMask.hide();
            $video.get(0).play();
        }

        //----------- recommend
        var interestHtml = '';

        for(var m = 0, n = resContent.mayLikes.length; m < n; m++){
            interestHtml += '<li><a href="' + location.protocol + '//' + location.host + location.pathname + '?id=' + resContent.mayLikes[m].id + '"><img src="' + resContent.mayLikes[m].videoCoverUrl + '" alt=""></a></li>';
        }

        var $recommendWrapper = $('#recommend_wrapper'),
            $recommendListContainer = $('#recommend_list');

        $recommendListContainer.html(interestHtml);

        var liWidth = 120,
            liLength = $recommendListContainer.find('li').length,
            liMargin = 10;
        var recommendContainerWidth = liLength * liWidth + (liLength - 1) * liMargin;

        $recommendListContainer.css({
            width: recommendContainerWidth
        });

        $recommendListContainer.find('li img').on('load', function () {
            Util.adjustImg(this);
        })

        // --------- end
        
        /**
         * 渲染页面
         */
        function render() {
            $uploaderWrapper.show();
            $videoWrapper.show();
            $recommendWrapper.show();
        }

        /**
         * 隐藏加载
         * @return {[type]} [description]
         */
        function hideLoading() {
            $('.loading').remove();
        }
        
        /**
         * 处理微信分享图片
         * @return {[type]} [description]
         */
        function handleWXShareIcon() {
            $('body').prepend('<div style="position:absolute; opacity:0; filter: alpha(opacity=0);"><img src="'+ shareInfo.imageUrl +'" /></div>');
        }

        document.title = shareInfo.title;
        hideLoading();
        handleWXShareIcon();
        render();
    }
    
});

