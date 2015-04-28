<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>数据编辑</title>
	<link rel="stylesheet" href="css/common.css">
</head>
<body>
	<script src="js/jquery.js"></script>
	<script src="js/common.js"></script>
	<script src="js/ZeroClipboard.js"></script>
	<script src="js/cat.js"></script>
	<script src="js/data.js"></script>
	<script>
	window.onload = function(){
		if(!window.list){
			var list = [];
		}else{
			list = window.list;
		}
		if(!window.cat){
			return false;
		}else{
			var cat = window.cat;
		}
		//平台
		if(!cat["main"]){	// 平台不存在的话，新建一个平台
			return false;
		}
		//频道
		if(!cat["sub"]){	// 次频道不存在的话，新建一个次频道
			return false;
		}
		var cat_main = cat["main"],
			cat_sub = cat["sub"];

		var html = "";
		html += '<div class="top"><h1>数据编辑</h1><button id="j_getjson">更新数据</button></div>';
		html += '<div class="container" id="container">';
		html += '<h2>数据列表</h2><table class="table" id="table_list">';
		html += '<thead>';
		html += '<tr>';
		html += '<th width="12%">标题</th>';
		html += '<th width="30%">URL</th>';
		html += '<th width="8%">平台</th>';
		html += '<th width="8%">频道</th>';
		html += '<th width="10%">关键词<p style=" font-weight:normal;">（以空格分隔开）</p></th>';
		html += '<th width="5%">屏蔽</th>';
		html += '<th width="10%">描述</th>';
		html += '<th>操作</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';
		if(list.length >= 1){
			for(var i = 0; i<list.length; i++){
				html += '<tr data-status="true" data-id="'+list[i]["id"]+'" data-time="'+list[i]["time"]+'">';
				html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title">';
				html += '<span>'+list[i]["title"]+'</span>';
				html += '</td>';
				html += '<td data-edit="true" data-model="text" data-tag="a" data-info="url">';
				html += '<a href="'+list[i]["url"]+'" target="_blank">'+list[i]["url"]+'</a>';
				html += '</td>';
				html += '<td data-edit="true" data-model="checkbox" data-tag="li" data-info="mainflag" data-flag="'+list[i]["mainflag"].join(" ")+'">';
				html += '<ul>';
				for(var j = 0; j<list[i]["mainflag"].length;j++){
					var temp_flag = list[i]["mainflag"][j],
						temp_main = "";
					for(var m = 0; m<cat_main.length; m++){
						if(temp_flag == cat_main[m]["flag"]){
							temp_main = cat_main[m]["title"];
							break;
						}
					}
					html += '<li data-flag="'+list[i]["mainflag"][j]+'">'+temp_main+'</li>';
				}
				html += '</ul>';
				html += '</td>';
				var temp_flag_sub = list[i]["subflag"],
					temp_sub = "";
				for(var n = 0; n<cat_sub.length;n++){
					if(temp_flag_sub == cat_sub[n]["flag"]){
						temp_sub = cat_sub[n]["title"];
						break;
					}
				}
				html += '<td data-edit="true" data-model="select" data-tag="span" data-info="subflag" data-flag="'+temp_flag_sub+'">';
				html += '<span>'+temp_sub+'</span>';
				html += '</td>';
				html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="keyword">';
				html += '<span>'+list[i]["keyword"].join(" ")+'</span>';
				html += '</td>';
				var temp_isChecked = "",
					temp_isResult = "";
				if(list[i]["shield"]){
					temp_isChecked="checked=true";
					temp_isResult="true";
				}else{
					temp_isResult="false";
				}
				html += '<td data-edit="true" data-model="checkbox" data-tag="checkbox" data-info="shield" data-result="'+temp_isResult+'">';
				html += '<input type="checkbox" '+ temp_isChecked +' disabled="disabled" />';
				html += '</td>';
				html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description">';
				html += '<span>'+list[i]["description"]+'</span>';
				html += '</td>';
				if(i==list.length -1){
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="add">增加</button></td>';
				}else{
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="insert">插入</button></td>';
				}
				html += '</tr>';
			}
		}else{
			html += tools.createRow(2);
		}
		html += '</tbody>';
		html += '</table>';
		html += '</div>';
		$("body").append(html);
		var tableList = $("#table_list");
		if(list.length <= 0){
			var aTd = tableList.find("tr").eq(1).find("td:not(:last)");
			for(var i = 0; i<aTd.length; i++){
				aTd.eq(i).attr("data-edit","false");
				tools["edit"]($(aTd.eq(i)));
			}
		}
		tools["evenLine"](tableList);

		tableList.on("mouseover","tbody tr",function(){
			$(this).addClass("hover");
		}).on("mouseout","tbody tr",function(){
			$(this).removeClass("hover");
		}).on("click",function(e){
			var ev = e || window.event,
				$target = $(ev.target) || $(ev.elementSrc);
			if($target.attr("data-action")){
				var $tr = $target.parents("tr");
				if($target.attr("data-action") == "moveup"){
					tools["moveup"]($target);
				}else if($target.attr("data-action") == "movedown"){
					tools["movedown"]($target);
				}else if($target.attr("data-action") == "edit"){
					var bool = true;
						aTd = $tr.find("td:not(:last)");
					for(var i=0; i<aTd.length; i++){
						if(aTd.eq(i).attr("data-edit")=="false"){
							bool =false;
						}
					}
					if(bool){
						for(var i=0; i<aTd.length; i++){
							aTd.eq(i).attr("data-edit","false");
							tools["edit"](aTd.eq(i));
						}
						$target.attr("data-action","save").html("保存");
					}
				}else if($target.attr("data-action") == "save"){
					var bool = true,
						aTd =$tr.find("td:not(:last)");
					for(var i=0; i<aTd.length; i++){
						var info = aTd.eq(i).attr("data-info");
						if(!reg[info](aTd.eq(i))){
							bool = false;
							aTd.eq(i).find(".txt").addClass("txt-error");
							break;
						}
					}
					if(bool){
						for(var j = 0; j<aTd.length; j++){
							if(aTd.eq(j).attr("data-edit")=="false"){
								aTd.eq(j).attr("data-edit","true");
								tools["save"](aTd.eq(j));
							}
						}
						$target.attr("data-action","edit").html("编辑");
						$tr.attr("data-status","true");
					}
				}else if($target.attr("data-action") == "delete"){
					tools["delete"]($tr,2);
				}else if($target.attr("data-action") == "add"){
					tools["add"]($tr,2);
				}else if($target.attr("data-action") == "insert"){
					tools["insert"]($tr,2);
				}
			}
		});

		$("body").on("click","#j_getjson",function(){
			$.post("updata_data.php",{"json":tools["getJson"](2)},function(){
				alert("数据已更新");
			})
		})
	}
	</script>
</body>
</html>