(function($){

  $.fn.slider = function(opt){
    var def = {
      maxShowLen: 5,
      marginValue: 0,
      delayTime: 300,
      isAutoPlay: true,
      speed: 5000,
      isMovePause: false,
      currentClass: "current",
      mainUlClass: "slider-main",
      navWrapClass: "slider-extra",
      navClass: "slider-nav",
      prevClass: "slider-prev",
      nextClass: "slider-next"
    }

    var def = $.extend(true, def, opt);

    var maxShowLen = def.maxShowLen,
        marginValue = def.marginValue,
        delayTime = def.delayTime,
        isAutoPlay = def.isAutoPlay,
        speed = def.speed,
        isMovePause = def.isMovePause,
        currentClass = def.currentClass,
        mainUlClass = def.mainUlClass,
        navWrapClass = def.navWrapClass,
        navClass = def.navClass,
        prevClass = def.prevClass,
        nextClass = def.nextClass;

    var $slider = $(this),
        $main = $slider.find("." + mainUlClass),
        $mainList = $main.find("li"),
        $extra = $slider.find("." + navWrapClass),
        $nav = $slider.find("." + navClass),
        $navUl = $nav.find("ul"),
        $navList = $nav.find("li"),
        $prev = $slider.find("." + prevClass),
        $next = $slider.find("." + nextClass);

    var listLen = $navList.length,
        listWidth = $navList.eq(0).outerWidth(),
        cur = 0;

    var navUlLeft = 0,
        navliWidth = listWidth+marginValue;

    var isPreventHurry = true; // 防止点过快
    var timeoutAutoPlay = null;
    var timeoutNav = null;
    var isExceed = listLen > maxShowLen ? true : false; //是否超过最大个数
    var leftCount = 0;  //左侧隐藏个数

    // 初始化
    function init(){
      // mainLi状态
      $mainList.css({
        "zIndex": 0,
        "opacity": 0
      }).eq(cur).css({
        "zIndex": 1,
        "opacity": 1
      })
      $extra.css("zIndex", 1);
      // 设置ul宽度
      $navUl.css("width",listLen*(listWidth+marginValue)).attr("data-left", "0");
    }
    init();
    
    function switchCurrent(current, index){
      clearTimeout(timeoutAutoPlay);
      $navList.removeClass(currentClass).eq(index).addClass(currentClass);
      $mainList.eq(index).animate({
        opacity:1
      }, 600, function(){
        $(this).css("zIndex",1);
        isPreventHurry = true;
      }).siblings().animate({
        opacity:0
      }, 600, function(){
        $(this).css("zIndex",0);
      });
      cur = index;
      if(isExceed){
        navUlLeft = parseInt($navUl.attr("data-left"), 10);
        leftCount = navUlLeft / navliWidth;

        if(index >= (maxShowLen - leftCount)){
          sliderUl(navUlLeft - navliWidth);
        }else if(index < -leftCount){
          sliderUl(navUlLeft + navliWidth);
        }
      }
      autoPlay();
    }

    function sliderUl(value){
      $navUl.stop(true).animate({
        left: value + "px"
      }).attr("data-left", value);
    }

    function prev(){
      if(isPreventHurry){
        isPreventHurry = false;
        var _cur = cur;
        if(cur === 0){
          cur = listLen - 1;
        }else{
          cur--;
        }
        switchCurrent(_cur, cur);
      }
    }

    function next(){
      if(isPreventHurry) {
        isPreventHurry = false;
        var _cur = cur;
        if (cur === listLen - 1) {
          cur = 0;
        } else {
          cur++;
        }
        switchCurrent(_cur, cur);
      }
    }

    function autoPlay(){
      if(isAutoPlay) {
        timeoutAutoPlay = setTimeout(function () {
          next();
        }, speed);
      }
    }

    $prev.on("click", prev);
    $next.on("click", next);

    $navList.on("mouseover",function(){
      var $this = $(this),
          index = $navList.index($this);
      clearTimeout(timeoutNav);
      clearTimeout(timeoutAutoPlay);
      if(!$this.hasClass(currentClass)){
        timeoutNav = setTimeout(function(){
          switchCurrent(cur, index);
          clearTimeout(timeoutAutoPlay)
        },delayTime);
      }

    }).on("mouseout",function(){
      clearTimeout(timeoutNav);
      autoPlay();
    })

    autoPlay();

    if(isMovePause){
      $slider.on("mousemove", function(){
        clearTimeout(timeoutAutoPlay);
        timeoutAutoPlay = null;
      }).on("mouseleave", function(){
        autoPlay();
      })
    }

  }

}(jQuery))