/**
 * 图片分享页
 * @cjf 20170413
 */

$(function () {

    var queryId = Util.query.id ? Util.query.id : '',
        serverUrl = Util.serverUrl;

    var defaultCoverUrl = './src/images/default_375x200.png';

    /**
     * 获取视频接口
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function getPhoto(id) {
        var url = serverUrl + '/app/bdAblum/addPhotoSort?id=' + id;

        return $.ajax({
            url: url
        });
    }

    // 顶部banner关闭事件
    $('.fixed-top-banner .ico-close').on('click', function (e) {
        $(this).parents('.fixed-top-banner').remove();
    });

    getPhoto(queryId).then(function (res) {
        return res;
    }).done(function (data, status, xhr) {
        onResponse(data);
    }).fail(function (xhr, errorType, error) {
        // alert('数据加载失败，请稍后在试！');
        onError();
    });

    function onError() {
        $('.loading').remove();
        $('body').append('<p class="tip-error">加载失败，请稍后再试！</p>');
    }

    function onResponse(res) {
        if(res.code !== 1 || !res.content || !res.content.shareInfo){
            // alert('加载失败，请稍后再试!');
            // return;
            onError();
            return;
        }

        var resContent = res.content,
            shareInfo = resContent.shareInfo;

        var $imageWrapper = $('#image_wrapper'),
            $image = $imageWrapper.find('img'),
            $imageDescript = $('#image_descript');

        if(shareInfo.imageUrl){
            var img = new Image();
            img.src = shareInfo.imageUrl;
            img.onload = function(){
                $image.attr('src', shareInfo.imageUrl);
            }
            img.onerror = function () {
                // $image.attr('src', defaultCoverUrl);
                onError();
            }
        }else{
            // $image.attr('src', defaultCoverUrl);
            onError();
        }

        $imageDescript.html(shareInfo.description);

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
        // function handleWXShareIcon() {
        //     $('body').prepend('<div style="display: none;"><img src="'+ shareInfo.imageUrl +'" /></div>');
        // }

        document.title = shareInfo.title;
        hideLoading();
        // handleWXShareIcon();
        $imageWrapper.show();

    }
    
});

