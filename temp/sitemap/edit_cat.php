<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>平台、频道编辑</title>
	<link rel="stylesheet" href="css/common.css">
</head>
<body>
	<script src="js/jquery.js"></script>
	<script src="js/common.js"></script>
	<script src="js/ZeroClipboard.js"></script>
	<script src="js/cat.js"></script>
	<script>
	window.onload = function(){
		if(!window.cat){
			window.cat = {};	//如果cat对象不存在，新建一个cat对象
		}else{
			var cat = window.cat;
		}
		//平台
		if(!cat["main"]){	// 平台不存在的话，新建一个平台
			cat.main = [];
		}
		//分支
		if(!cat["branch"]){	// 分支不存在的话，新建一个分支
			cat.branch = [];
		}
		//频道
		if(!cat["sub"]){	// 次频道不存在的话，新建一个次频道
			cat.sub = [];
		}
		var cat_main = cat["main"],
			cat_branch = cat["branch"],
			cat_sub = cat["sub"];
		//平台
		var html = "";
		html += '<div class="top"><h1>频道管理</h1><button id="j_getjson">更新频道</button></div>';
		html += '<div class="container" id="container">';
		html += '<h2>平台</h2><table class="table" id="table_main" data-cat="main">';
		html += '<thead>';
		html += '<tr>';
		html += '<th width="15%">平台</th>';
		html += '<th width="15%">描述</th>';
		html += '<th>操作</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		if(cat_main.length>=1){
			for(var i =0; i<cat_main.length;i++){
				html += '<tr data-flag="'+cat_main[i]["flag"]+'" data-status="true">';
				html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title"><span>'+cat_main[i]["title"]+'</span></td>';
				html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description"><span>'+cat_main[i]["description"]+'</span></td>';
				if(i==cat_main.length -1){
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="add">增加</button></td>'
				}else{
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="insert">插入</button></td>'
				}
				html += '</tr>';
			}
		}else{
			html += tools["createRow"](1);
		}
		html += '</tbody>';
		html += '</table>';

		//分支
		html += '<h2>分支</h2><table class="table" id="table_branch" data-cat="branch">';
		html += '<thead>';
		html += '<tr>';
		html += '<th width="15%">分支</th>';
		html += '<th width="15%">平台</th>';
		html += '<th width="15%">描述</th>';
		html += '<th>操作</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';

		if(cat_branch.length>=1){
			for(var i =0; i<cat_branch.length;i++){
				html += '<tr data-flag="'+cat_branch[i]["flag"]+'" data-status="true">';
				html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title"><span>'+cat_branch[i]["title"]+'</span></td>';
				html += '<td data-edit="true" data-model="checkbox" data-tag="li" data-info="mainflag" data-flag="'+cat_branch[i]["mainflag"].join(" ")+'">';
				html += '<ul>';
				for(var j = 0; j<cat_branch[i]["mainflag"].length;j++){
					var temp_flag = cat_branch[i]["mainflag"][j],
						temp_main = "";
					for(var m = 0; m<cat_main.length; m++){
						if(temp_flag == cat_main[m]["flag"]){
							temp_main = cat_main[m]["title"];
							break;
						}
					}
					html += '<li data-flag="'+cat_branch[i]["mainflag"][j]+'">'+temp_main+'</li>';
				}
				html += '</ul>';
				html += '</td>';
				html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description"><span>'+cat_branch[i]["description"]+'</span></td>';
				if(i==cat_branch.length -1){
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="add">增加</button></td>'
				}else{
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="insert">插入</button></td>'
				}
				html += '</tr>';
			}
		}else{
			html += tools["createRow"](3);
		}
		html += '</tbody>';
		html += '</table>';

		//频道
		html += '<h2>频道</h2><table class="table" id="table_sub" data-cat="sub">';
		html += '<thead>';
		html += '<tr>';
		html += '<th width="15%">频道</th>';
		html += '<th width="15%">描述</th>';
		html += '<th>操作</th>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';
		if(cat["sub"].length >= 1){
			for(var i =0; i<cat_sub.length;i++){
				html += '<tr data-flag="'+cat_sub[i]["flag"]+'" data-status="true">';
				html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title"><span>'+cat_sub[i]["title"]+'</span></td>';
				html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description"><span>'+cat_sub[i]["description"]+'</span></td>';
				if(i==cat_sub.length -1){
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="add">增加</button></td>';
				}else{
					html+= '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="edit">编辑</button><button data-action="delete">删除</button><button data-action="insert">插入</button></td>';
				}
				html += '</tr>';
			}
		}else{
			html += tools["createRow"](1);
		}
		html += '</tbody>';
		html += '</table>';
		html += '</div>';

		$("body").append(html);

		var tableMain = $("#table_main"),
			tableBranch = $("#table_branch"),
			tableSub = $("#table_sub");
		if(cat_main.length <= 0){
			var aTd = tableMain.find("tr").eq(1).find("td:not(:last)");
			for(var i = 0; i<aTd.length;i++){
				aTd.eq(i).attr("data-edit","false");
				tools["edit"](aTd.eq(i));
			}
		}

		if(cat_branch.length <= 0){
			var aTd = tableBranch.find("tr").eq(1).find("td:not(:last)");
			for(var i = 0; i<aTd.length; i++){
				aTd.eq(i).attr("data-edit","false");
				tools["edit"]($(aTd.eq(i)));
			}
		}

		if(cat_sub.length <= 0){
			var aTd = tableSub.find("tr").eq(1).find("td:not(:last)");
			for(var i = 0; i<aTd.length; i++){
				aTd.eq(i).attr("data-edit","false");
				tools["edit"]($(aTd.eq(i)));
			}
		}

		tools["evenLine"](tableMain);
		tools["evenLine"](tableBranch);
		tools["evenLine"](tableSub);

		$("#table_main,#table_sub").on("mouseover","tbody tr",function(){
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
						if(!$tr.attr("data-flag")){
							$tr.attr("data-flag",new Date().getTime());
						}
					}
				}else if($target.attr("data-action") == "delete"){
					tools["delete"]($tr);
				}else if($target.attr("data-action") == "add"){
					tools["add"]($tr);
				}else if($target.attr("data-action") == "insert"){
					tools["insert"]($tr,1);
				}
			}

			tools["stopPropagation"](e);
		});

		$("#table_branch").on("mouseover","tbody tr",function(){
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
						if(!$tr.attr("data-flag")){
							$tr.attr("data-flag",new Date().getTime());
						}
					}
				}else if($target.attr("data-action") == "delete"){
					tools["delete"]($tr,3);
				}else if($target.attr("data-action") == "add"){
					tools["add"]($tr,3);
				}else if($target.attr("data-action") == "insert"){
					tools["insert"]($tr,3);
				}
			}

			tools["stopPropagation"](e);
		});


		$("body").on("click","#j_getjson",function(){
			$.post("updata_cat.php",{"json":tools["getJson"](1)},function(){
				alert("数据已更新");
			})
		})
	}
	</script>
</body>
</html>