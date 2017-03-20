/**
 * 视频分享页
 * @cjf 20170320
 */

// polyfill
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
    /**
     * 获取视频接口
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function getVideoInfo(id) {
        var url = './data/mock.getVideoInfo.js';

        return $.ajax({
            url: url
        });
    }

    getVideoInfo().then(function (res) {
        console.log('then');
        console.log(res);
        return JSON.parse(res)[0] || res;
    }).done(function (data, status, xhr) {
        console.log('done');
        console.log(data);

        setTimeout(function () {
            onResponseVideoInfo(data);
        }, 1000);

    }).fail(function (xhr, errorType, error) {
        console.log(errorType);
        console.log(error);
        alert('页面加载失败，请稍后在试！');
    });

    function onResponseVideoInfo(res) {

        if(res.code !== 1){
            alert(res.msg);
            return;
        }

        var resContent = res.content;
        
        //----------- uploader
        var $uploaderWrapper = $('#uploader_wrapper'),
            $uploaderName = $uploaderWrapper.find('.uploader-name'),
            $uploaderHeadPic = $uploaderWrapper.find('.uploader-headpic img'),
            $uploaderCreateTime = $uploaderWrapper.find('.uploader-createtime'),
            $uploaderPlayTotal = $uploaderWrapper.find('.uploader-play-total');

        $uploaderHeadPic.attr('src', resContent.publisherHeadPic);
        $uploaderName.html(resContent.publisher);
        $uploaderCreateTime.html(new Date(resContent.createTime).Format('MM-dd hh:mm'));
        $uploaderPlayTotal.html(convertToUnitTenThousand(resContent.playNum));

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
        for(var i = 0, len = resContent.tags.length; i < len; i++){
            tagsHtml += '<a href="#">#' + resContent.tags[i].text + '#</a>';
        }

        $video.attr({
            src: resContent.playUrl,
            preload: true
        });
        $videoTitle.html(resContent.title);
        $videoDescription.html(resContent.description);
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

        for(var m = 0, n = resContent.interest.length; m < n; m++){
            interestHtml += '<li><a href="' + resContent.interest[m].url + '"><img src="' + resContent.interest[m].coverUrl + '" alt=""></a></li>';
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

        hideLoading();
        render();
    }
    
});

