var tpz, total = 0, tarr = [];
$(function(){

    var ssrList = '', srList = '', rList = '';
    for(var item in arrSsr){
    	ssrList += '<span class="list-item"><span class="item">'
                + '<img src="' + 'https://www.16163.com/zt/yys/gj/zrgj/img/kv_ss/' + arrSsr[item]['png'] +'"  title="' + arrSsr[item]['品质'] +'" class="item-img">'
                + '<span class="item-cover"><img src="images/cover.png" class="cover-img"></span>'
                + '</span>'+'<span class="item-word">'+ arrSsr[item]['品质'] +'</span>'+'</span>';
    }

    for(var item in arrSr){
    	srList += '<span class="list-item"><span class="item">'
                + '<img src="' + 'https://www.16163.com/zt/yys/gj/zrgj/img/kv_ss/' + arrSr[item]['png'] +'" title="' + arrSr[item]['品质'] +'" class="item-img">'
                + '<span class="item-cover"><img src="images/cover.png" class="cover-img"></span>'
                + '</span>'+'<span class="item-word">'+ arrSr[item]['品质'] +'</span>'+'</span>';
    }

    for(var item in arrR){
    	rList += '<span class="list-item"><span class="item">'
                + '<img src="' + 'https://www.16163.com/zt/yys/gj/zrgj/img/kv_ss/' + arrR[item]['png'] +'" title="' + arrR[item]['品质'] +'" class="item-img">'
                + '<span class="item-cover"><img src="images/cover.png" class="cover-img"></span>'
                + '</span>'+'<span class="item-word">'+ arrR[item]['品质'] +'</span>'+'</span>';
    }

    $(".cons .con-list").eq(0).html(ssrList);
    $(".cons .con-list").eq(1).html(srList);
    $(".cons .con-list").eq(2).html(rList);

    var height = $(".cons .con-list").eq(0).height();
    // console.log(height);
    // $(".cons .con-list").height(height);

    // 选择的式神 ch-item 
	$(".title-tab").click(function(){
		var index = $(this).index();
		$(".title-tab").removeClass("tab-now").eq(index).addClass("tab-now");
		$(".cons .con-list").hide().eq(index).show();
        $(".cons .item-more").hide();
//		if(index > 0 && $(".cons .con-list").eq(index).find('.list-item').length > 15 && $(".cons .con-list").eq(index).attr('style').indexOf('auto') == -1){
		if($(".cons .con-list").eq(index).find('.list-item').length > 15 && $(".cons .con-list").eq(index).attr('style').indexOf('auto') == -1){
            $(".cons .item-more").eq(index).show();
        }
	});

	$(".list-item").on("click", function(){
		var index = $(this).index();
		var parent = $(this).parent(".con-list");
		var cla = 'ch-item';
        if($(this).hasClass(cla)){
            $(this).removeClass(cla);
            total -= 1;
        }
        else{
            // if(total < 5){
                parent.find(".list-item").eq(index).addClass(cla);
                // tpz = $("."+cla).find(".item-img").attr("title");
                total += 1;
            // }
        }
        $(".has-num").html(total);
		
	});

    $(".cons .item-more").click(function(){
        $(this).prev(".con-list").css('height', 'auto');
        $(this).hide();
    });

    $(".btn-list .fl").click(function(){
        var $item = $(".ch-item");
        tarr = [];
        for(var i = 0; i < $item.length; i ++){
           tarr[tarr.length] = $item.eq(i).find(".item-img").attr("title");
        }
        // console.log(tarr);
        choiceGrp();
    });

    $(".btn-list .fr").click(function(){
        $(".ch-item").removeClass("ch-item");
        total = 0;
        $(".has-num").html(total);
        $('.rems').html('');
    });

   













});