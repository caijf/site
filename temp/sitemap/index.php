<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>原型索引</title>
	<link rel="stylesheet" href="css/common.css">
</head>
<body>
	<script src="js/jquery.js"></script>
	<script src="js/common.js"></script>
	<script src="js/cat.js"></script>
	<script src="js/data.js"></script>
	<script>
	window.onload = function(){
		if(!Array.indexOf){
			Array.prototype.indexOf = function(str){
				var n = -1;
				for(var i = 0; i < this.length; i++){
					if(this[i] == str){
						n = i;
						break;
					}
				}
				return n;
			}
		}
		function formatDate(time){
			var date = new Date(time),
				year = date.getFullYear(),
				month = Number(date.getMonth())+1,
				day = date.getDate();
			return year + "-" + month + "-" + day;
		}
		function extend(obj1,obj2){
			for(var attr in obj2){
				obj1[attr] = obj2[attr];
			}
			return obj1;
		}

		/**
		 * [createResultHtml description]
		 * @param  {[type]} data                [description]
		 * @param  {[type]} boolShowShield      [description]
		 * @param  {[type]} boolShowDescription [description]
		 * @param  {[type]} boolShowDate        [description]
		 * @param  {[type]} curBranchName       [description]
		 * @param  {[type]} changeBranchName    [description]
		 * @return {[type]}                     [description]
		 */
		// function createResultHtml(data,boolShowShield,boolShowDescription,boolShowDate,curBranchName,changeBranchName){
		function createResultHtml(obj){

			var opt = {
				'data':[],
				'isShowShield':false,
				'isShowDescription':false,
				'isShowTime':false,
				'curBranchName':'',
				'changeBranchName':'',
				'branchMainFlag':''
			};

			opt = extend(opt,obj);

			var html ="",
				data = opt.data,
				isShowShield = opt.isShowShield?'':' style="display:none;"',
				isShowTime = opt.isShowTime?'':' style="display:none;"',
				isShowDescription = opt.isShowDescription?'':' style="display:none;"',
				curBranchName = opt.curBranchName?opt.curBranchName:'master',
				changeBranchName = opt.changeBranchName?opt.changeBranchName:'',
				branchMainFlag = opt.branchMainFlag?opt.branchMainFlag:'';

			var branchMainFlagList = [];
			if(branchMainFlag){
				branchMainFlagList = branchMainFlag.split("|");
			}
			if(data.length >= 1){
				html += '<table class="table">';
				html += '<thead>';
				html += '<th width="15%">标题</th>';
				html += '<th>URL</th>';
				html += '<th width="5%"'+isShowShield+'>屏蔽</th>';
				html += '<th width="15%"'+isShowDescription+'>描述</th>';
				html += '<th width="8%"'+isShowTime+'>时间</th>';
				html += '</thead>';
				html += '<tbody>';
				for(var i = 0; i<data.length;i++){
					var isShield = "",
						isShieldHtml = "";
					if(data[i]["shield"]){
						if(!isShowShield){
							isShield = ' style="display:none;"';
						}
						isShieldHtml = "√";
					}
					html += '<tr data-title="'+ data[i]["title"] +'" '+isShield+' data-id="'+data[i]["id"]+'" data-time="'+data[i]["time"]+'" data-main="'+data[i]["mainflag"].join(" ")+'" data-sub="'+data[i]["subflag"]+'" data-keyword="'+data[i]["keyword"].join(" ")+'" data-shield="'+data[i]["shield"]+'">';
					html += '<td>'+data[i]["title"]+'</td>';

					var boolChangeBranch = false;
					if(branchMainFlagList.length > 0){
						for(var m = 0; m < branchMainFlagList.length; m++){
							if(data[i]["mainflag"].indexOf(branchMainFlagList[m]) > -1){
								boolChangeBranch = true;
								break;
							}
						}
					}

					var tempUrl = data[i]["url"];

					if(branchMainFlagList.indexOf("all") > -1 || boolChangeBranch){
						if(curBranchName != "master"){
							tempUrl = tempUrl.replace('/master/','/'+curBranchName+'/');
						}

						if(changeBranchName != ""){
							tempUrl = tempUrl.replace('/'+curBranchName+'/','/'+changeBranchName+'/');
						}
					}

					html += '<td><a href="'+tempUrl+'" target="_blank">'+tempUrl+'</a></td>';
					html += '<td'+isShowShield+'>'+isShieldHtml+'</td>';
					html += '<td'+isShowDescription+'>'+data[i]["description"]+'</td>';
					html += '<td'+isShowTime+'>'+formatDate(data[i]["time"])+'</td>';
					html += '</tr>';
				}
				html += '</tbody>';
				html += '</table>';
			}else{
				html += '<p class="tiptext tiptext-info">抱歉，没有找到索引数据！</p>';
			}
			return html;
		}

		function fliterDataMain(data,mainflag){
			var result = [];
			if(mainflag == "all"){
				result = $.extend(true,[],data);
			}else if($.isArray(data) && data.length >=1){
				for(var i=0; i<data.length;i++){
					if(data[i]["mainflag"].indexOf(mainflag) != -1){
						result.push(data[i]);
					}
				}
			}
			return result;
		}

		function fliterDataSub(data,subflag){
			var result = [];
			if(subflag == "all"){
				result = $.extend(true,[],data);
			}else if($.isArray(data) && data.length >=1){
				for(var i=0; i<data.length;i++){
					if(data[i]["subflag"].indexOf(subflag) != -1){
						result.push(data[i]);
					}
				}
			}
			return result;
		}

		function fliterDataKeyword(data,keyword){	//关键字搜索(data 是tr Object)
			if(keyword != ""){
				for(var i = 0; i<data.length;i++){
					//if(data.eq(i).attr("data-keyword").split(" ").indexOf(keyword) != -1 || data.eq(i).attr("data-title").indexOf(keyword) != -1){
					if(data.eq(i).attr("data-keyword").indexOf(keyword) != -1 || data.eq(i).attr("data-title").indexOf(keyword) != -1){
						if($("#j_show_shield").is(":checked")){
							data.eq(i).show();
						}else{
							if(data.eq(i).attr("data-shield") == "false"){
								data.eq(i).show();
							}else{
								data.eq(i).hide();
							}
						}
					}else{
						data.eq(i).hide();
					}
				}
			}else{
				for(var i = 0; i<data.length;i++){
					if($("#j_show_shield").is(":checked")){
						data.eq(i).show();
					}else{
						if(data.eq(i).attr("data-shield") == "false"){
							data.eq(i).show();
						}else{
							data.eq(i).hide();
						}
					}
				}
			}
		}

		//提示
		function tipTtext(status,str){
			var html = "";
			html += '<p class="tiptext tiptext-'+status+'">'+str+'</p>';
			return html;
		}

		//显示提示
		function allShieldTip(obj,status,str){
			var $tr = obj.find("tbody tr:visible");
			if($tr.length >= 1){
				obj.find(".tiptext").remove();
			}else{
				obj.find(".tiptext").remove();
				obj.append(tipTtext(status,str));
			}
		}

		//显示其他信息
		function showOtherInfo(target,obj,index){
			var $thead_tr = obj.find("thead tr"),
				$tr = $box_result.find("tbody tr");
			if(target.is(":checked")){
				$thead_tr.find("th").eq(index).show();
				$tr.each(function(i){
					$tr.eq(i).find("td").eq(index).show();
				})
			}else{
				$thead_tr.find("th").eq(index).hide();
				$tr.each(function(i){
					$tr.eq(i).find("td").eq(index).hide();
				})
			}
		}

		var html = "",
			list = window.list;
			cat = window.cat;
		html += '<div class="box-filter" id="j_box_filter">';
		html += '<div class="item clearfix" id="j_filter_main">';
		html += '<div class="title">平台</div>';
		if(cat["main"] && cat["main"].length >=1){
			var cat_main = cat["main"];
			html +='<ul class="clearfix">';
			html += '<li><a href="javascript:;" class="current" data-flag="all">全部</a></li>';
			for(var i=0;i<cat_main.length;i++){
				html += '<li><a href="javascript:;" data-flag="'+cat_main[i]["flag"]+'" title="'+cat_main[i]["description"]+'">'+cat_main[i]["title"]+'</a></li>';
			}
			html += '</ul>';
		}else{
			html += '<p class="tiptext tiptext-info">抱歉，没有找到主频道信息</p>';
		}
		html += '</div>';
		html += '<div class="item clearfix" id="j_filter_branch">';
		html += '<div class="title">分支</div>';
		if(cat["branch"] && cat["branch"].length >=1){
			var cat_branch = cat["branch"];
			html +='<ul class="clearfix">';
			html += '<li><a href="javascript:;" class="current" data-flag="all" data-branch="master"  data-mainflag="all">主分支</a></li>';
			for(var i=0;i<cat_branch.length;i++){
				html += '<li><a href="javascript:;" data-flag="'+cat_branch[i]["flag"]+'" data-branch="'+cat_branch[i]["title"]+'" data-mainflag="'+cat_branch[i]["mainflag"].join("|")+'" title="'+cat_branch[i]["description"]+'">'+cat_branch[i]["title"]+'</a></li>';
			}
			html += '</ul>';
		}else{
			html += '<p class="tiptext tiptext-info">抱歉，没有分支信息</p>';
		}
		html += '</div>';
		html += '<div class="item clearfix" id="j_filter_sub">';
		html += '<div class="title">频道</div>';
		if(cat["sub"] && cat["sub"].length >=1){
			var cat_sub = cat["sub"];
			html +='<ul class="clearfix">';
			html += '<li><a href="javascript:;" class="current" data-flag="all">全部</a></li>';
			for(var i=0;i<cat_sub.length;i++){
				html += '<li><a href="javascript:;" data-flag="'+cat_sub[i]["flag"]+'" title="'+cat_sub[i]["description"]+'">'+cat_sub[i]["title"]+'</a></li>';
			}
			html += '</ul>';
		}else{
			html += '<p class="tiptext tiptext-info">抱歉，没有找到子频道信息</p>';
		}
		html += '</div>';
		html += '<div class="item item-last item-search clearfix">';
		html += '<div class="title">搜索</div>';
		html += '<div class="box-search" id="j_box_search">';
		html += '<input type="text" class="txt" id="j_search_input" />';
		html += '<span class="box-checkbox">';
		html += '<label for="j_show_shield"><input type="checkbox" id="j_show_shield">显示屏蔽</label>';
		html += '<label for="j_show_description"><input type="checkbox" id="j_show_description">显示介绍</label>';
		//html += '<label for="j_sort_date"><input type="checkbox" id="j_sort_date">时间排序</label>';
		html += '<label for="j_show_date"><input type="checkbox" id="j_show_date">显示时间</label>';
		html += '</span>';
		html += '<div class="suggests" style="display:none;">关键字搜索提示</div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		html += '<div class="box-result" id="j_box_result">';
		html += createResultHtml({
			"data":list,
			"curBranchName":"master",
			"branchMainFlag":"all"
		});
		html += '</div>';

		$("body").append(html);
		var $fliter_main = $("#j_filter_main"),
			$fliter_sub = $("#j_filter_sub"),
			$fliter_branch = $("#j_filter_branch"),
			$fliter_search_input = $("#j_search_input"),
			$checkbox_shield = $("#j_show_shield"),
			$checkbox_description = $("#j_show_description"),
			$checkbox_sort = $("#j_sort_date"),
			$checkbox_date = $("#j_show_date"),
			$box_result = $("#j_box_result");

		tools["evenLine"]($box_result.find("table"));

		$box_result.on("mouseover","table tbody tr",function(){
			$(this).addClass("hover");
		}).on("mouseout","tbody tr",function(){
			$(this).removeClass("hover");
		})

		$fliter_main.on("click","a:not('.disabled')",function(){
			if($(this).hasClass("current")){
				return ;
			}else{
				var $this = $(this),
					main_flag = $this.attr("data-flag"),
					sub_flag = $fliter_sub.find("a.current").attr("data-flag"),
					curBranchName = $fliter_branch.find("a.current").attr("data-branch"),
					m_keyword = $.trim($fliter_search_input.val()),
					isShowShield = $checkbox_shield.is(":checked"),
					isShowDescription = $checkbox_description.is(":checked"),
					isShowSort = $checkbox_sort.is(":checked"),
					isShowTime = $checkbox_date.is(":checked");

				$fliter_main.find("a").removeClass("current");
				$this.addClass("current");

				var $branchFlagList = $fliter_branch.find("a").slice(1),
					tempCurBranchFlag = "";

				$branchFlagList.removeClass("disabled");

				if($this.attr("data-flag") != "all"){
					for(var i = 0; i < $branchFlagList.length; i++){
						tempCurBranchFlag = $branchFlagList.eq(i).attr("data-mainflag");
						if(tempCurBranchFlag.split("|").indexOf($this.attr("data-flag")) < 0){
							$branchFlagList.eq(i).addClass("disabled");
						}
					}
				}

				var result_sub = fliterDataSub(list,sub_flag);
				var result_main = fliterDataMain(result_sub,main_flag);

				$box_result.html(createResultHtml({
					"data":result_main,
					"isShowShield":isShowShield,
					"isShowDescription":isShowDescription,
					"isShowTime":isShowTime,
					"curBranchName":curBranchName,
					"branchMainFlag":$fliter_branch.find("a.current").attr("data-mainflag")
				}));
				fliterDataKeyword($box_result.find("tbody tr"),m_keyword);
				tools["evenLine"]($box_result.find("table"));
				var str = "";
				if($box_result.find("tbody tr").length>=1){
					if(m_keyword != ""){
						str = "没有相关的信息！";
					}else{
						str = "此处有屏蔽信息！";
					}
				}else{
					str = "没有相关的信息！";
				}
				allShieldTip($box_result,"info",str);
			}
		})

		$fliter_branch.on("click","a:not('.disabled')",function(){
			if($(this).hasClass("current")){
				return ;
			}else{
				var $this = $(this),
					main_flag = $fliter_main.find("a.current").attr("data-flag"),
					sub_flag = $fliter_sub.find("a.current").attr("data-flag"),
					curBranchName = $fliter_branch.find("a.current").attr("data-branch"),
					m_keyword = $.trim($fliter_search_input.val()),
					isShowShield = $checkbox_shield.is(":checked"),
					isShowDescription = $checkbox_description.is(":checked"),
					isShowSort = $checkbox_sort.is(":checked"),
					isShowTime = $checkbox_date.is(":checked");

				$fliter_branch.find("a").removeClass("current");
				$this.addClass("current");

				var $mainFlagList = $fliter_main.find("a").slice(1),
					tempCurMainFlag = "";
				$mainFlagList.removeClass("disabled");

				if($this.attr("data-flag") != "all"){
					for(var i = 0; i < $mainFlagList.length; i++){
						tempCurMainFlag = $mainFlagList.eq(i).attr("data-flag");
						if($this.attr("data-mainflag").split("|").indexOf(tempCurMainFlag) < 0){
							$mainFlagList.eq(i).addClass("disabled");
						}
					}
				}

				var result_sub = fliterDataSub(list,sub_flag);
				var result_main = fliterDataMain(result_sub,main_flag);

				$box_result.html(createResultHtml({
					"data":result_main,
					"isShowShield":isShowShield,
					"isShowDescription":isShowDescription,
					"isShowTime":isShowTime,
					"curBranchName":curBranchName,
					"changeBranchName":$this.attr("data-branch"),
					"branchMainFlag":$this.attr("data-mainflag")
				}));
				fliterDataKeyword($box_result.find("tbody tr"),m_keyword);
				tools["evenLine"]($box_result.find("table"));
				var str = "";
				if($box_result.find("tbody tr").length>=1){
					if(m_keyword != ""){
						str = "没有相关的信息！";
					}else{
						str = "此处有屏蔽信息！";
					}
				}else{
					str = "没有相关的信息！";
				}
				allShieldTip($box_result,"info",str);
			}
		})

		$fliter_sub.on("click","a:not('.disabled')",function(){
			if($(this).hasClass("current")){
				return ;
			}else{
				var $this = $(this),
					sub_flag = $this.attr("data-flag"),
					main_flag = $fliter_main.find("a.current").attr("data-flag"),
					curBranchName = $fliter_branch.find("a.current").attr("data-branch"),
					m_keyword = $.trim($fliter_search_input.val()),
					isShowShield = $checkbox_shield.is(":checked"),
					isShowDescription = $checkbox_description.is(":checked"),
					isShowSort = $checkbox_sort.is(":checked"),
					isShowTime = $checkbox_date.is(":checked");

				$fliter_sub.find("a").removeClass("current");
				$this.addClass("current");

				var result_main = fliterDataMain(list,main_flag);
				var result_sub = fliterDataSub(result_main,sub_flag);

				$box_result.html(createResultHtml({
					"data":result_sub,
					"isShowShield":isShowShield,
					"isShowDescription":isShowDescription,
					"isShowTime":isShowTime,
					"curBranchName":curBranchName,
					"branchMainFlag":$fliter_branch.find("a.current").attr("data-mainflag")
				}));
				fliterDataKeyword($box_result.find("tbody tr"),m_keyword);
				tools["evenLine"]($box_result.find("table"));

				var str = "";
				if($box_result.find("tbody tr").length>=1){
					if(m_keyword != ""){
						str = "没有相关的信息！";
					}else{
						str = "此处有屏蔽信息！";
					}
				}else{
					str = "没有相关的信息！";
				}
				allShieldTip($box_result,"info",str);
			}
		})
		$fliter_search_input.live("keyup",function(){
			var $tr = $box_result.find("tbody tr"),
				m_keyword = $.trim($fliter_search_input.val()),
				value = $.trim($(this).val());
			fliterDataKeyword($tr,value,2);
			tools["evenLine"]($box_result.find("table"));
			var str = "";
			if($box_result.find("tbody tr").length>=1){
				if(m_keyword != ""){
					str = "没有相关的信息！";
				}else{
					str = "此处有屏蔽信息！";
				}
			}else{
				str = "没有相关的信息！";
			}
			allShieldTip($box_result,"info",str);
		})

		$checkbox_shield.live("change",function(){
			var $this = $(this),
				$tr = $box_result.find("tbody tr"),
				m_keyword = $.trim($fliter_search_input.val()),
				value = $.trim($fliter_search_input.val());

			showOtherInfo($this,$box_result,2);

			fliterDataKeyword($tr,value,2);
			tools["evenLine"]($box_result.find("table"));
			var str = "";
			if($box_result.find("tbody tr").length>=1){
				if(m_keyword != ""){
					str = "没有相关的信息！";
				}else{
					str = "此处有屏蔽信息！";
				}
			}else{
				str = "没有相关的信息！";
			}
			allShieldTip($box_result,"info",str);
		})

		$checkbox_description.live("change",function(){
			showOtherInfo($(this),$box_result,3);
		})

		$checkbox_date.live("change",function(){
			showOtherInfo($(this),$box_result,4);
		})

		// $checkbox_sort.live("change",function(){
		// 	var $this = $(this),
		// 		$tr = $box_result.find("tbody tr"),
		// 		n = {},
		// 		result = [];
		// 	for(var i=0; i<$tr.length;i++){
		// 		n["id"] = $tr.eq(i).attr("data-id");
		// 		arr.push($tr.eq(i).attr("data-time"));
		// 	}

		// 	if($this.is(":visible")){
		// 		arr.sort().reverse();
		// 		for(var i = 0; i <list.length;i++){

		// 		}
		// 	}
		// })
	}
	</script>
</body>
</html>