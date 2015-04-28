var reg = {
	"title":function(tdObj){
		var value = tdObj.find("input").eq(0).val();
		if(/[\,\'\"]/.test(value)){
			return false;
		}else{
			return /\S/g.test($.trim(value));
		}
	},
	"description":function(tdObj){
		var value = tdObj.find("textarea").eq(0).val();
		if(/[\,\'\"]/.test(value)){
			return false;
		}else{
			return true;
		}
	},
	"url":function(tdObj){
		var value = tdObj.find("input").eq(0).val();
		if(/[\,\'\"]/.test(value)){
			return false;
		}else{
			return /^(http:\/\/)/g.test($.trim(value));
		}
	},
	"mainflag":function(tdObj){
		var checkbox = tdObj.find("input[type='checkbox']"),
			arr_checkbox = [];
		for(var i=0; i<checkbox.length;i++){
			if(checkbox.eq(i).is(":checked")){
				arr_checkbox.push(i);
			}
		}
		if(arr_checkbox.length >=1){
			return true;
		}else{
			return false;
		}
	},
	"subflag":function(tdObj){
		return true;
	},
	"keyword":function(tdObj){
		var value = tdObj.find("textarea").eq(0).val();
		if(/[\,\'\"]/.test(value)){
			return false;
		}else{
			return true;
		}
	},
	"shield":function(tdObj){
		return true;
	}
}
var tools = {
	"substitute":function (template, map, transform, thisObject) {
	    thisObject = thisObject || window;
	    transform = transform || thisObject['transform'] || function(v) { return v; };

	    return template.replace(/\\?\{([^{}]+)\}/g, function(match, key){
	    	//console.log(match);
	        var value = map[key] || ("undefined" === typeof map[key] ? match : map[key]);
	        return transform(value, key).toString();
	    });
	},
	"evenLine":function (tableObj){
		var aTr = tableObj.find("tr:visible");
		for(var i = 0; i<aTr.length; i++){
			if(i%2 ==1){
				aTr.eq(i).addClass("even");
			}else{
				aTr.eq(i).removeClass("even");
			}
		}
	},
	"createRow":function(type,action){
		var html = '',
			action = action?action:"add",
			temp_action = "";
		if(action == "add"){
			temp_action = '<button data-action="add">增加</button>';
		}else if(action == "insert"){
			temp_action = '<button data-action="insert">插入</button>';
		}
		html += '<tr>';
		switch(type){
			case 1:
			html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title">';
			html += '<span></span>';
			html += '</td>';
			html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description">';
			html += '<span></span>';
			html += '</td>';
				break;
			case 2:
			html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title">';
			html += '<span></span>';
			html += '</td>';
			html += '<td data-edit="true" data-model="text" data-tag="a" data-info="url">';
			html += '<a href="" target="_blank"></a>';
			html += '</td>';
			html += '<td data-edit="true" data-model="checkbox" data-tag="li" data-info="mainflag">';
			html += '<ul><li></li></ul>';
			html += '</td>';
			html += '<td data-edit="true" data-model="select" data-tag="span" data-info="subflag">';
			html += '<span></span>';
			html += '</td>';
			html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="keyword">';
			html += '<span></span>';
			html += '</td>';
			html += '<td data-edit="true" data-model="checkbox" data-tag="checkbox" data-info="shield">';
			html += '<input type="checkbox" />';
			html += '</td>';
			html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description">';
			html += '<span></span>';
			html += '</td>';
				break;
			case 3:
			html += '<td data-edit="true" data-model="text" data-tag="span" data-info="title">';
			html += '<span></span>';
			html += '</td>';
			html += '<td data-edit="true" data-model="checkbox" data-tag="li" data-info="mainflag">';
			html += '<ul><li></li></ul>';
			html += '</td>';
			html += '<td data-edit="true" data-model="textarea" data-tag="span" data-info="description">';
			html += '<span></span>';
			html += '</td>';
				break;
			default:
				break;
		}
		html += '<td><button data-action="moveup">上移</button><button data-action="movedown">下移</button><button data-action="save">保存</button><button data-action="delete">删除</button>'+temp_action+'</td>'
		html +='</tr>';
		return html;
	},
	"edit":function(tdObj){
		var model = tdObj.attr("data-model"),
			tag = tdObj.attr("data-tag");

		switch(model){
			case "text":
				var $ele = tdObj.find(tag).eq(0),
					str = $.trim($ele.html()),
					urlClass = "";
				$ele.hide();
				if(tag == "a"){
					urlClass = " txt-url";
				}
				tdObj.append('<input type="text" class="txt'+ urlClass +'" value="'+str+'" />');
				break;
			case "textarea":
				var $ele = tdObj.find(tag).eq(0),
					str = $.trim($ele.html());
				$ele.hide();
				tdObj.append('<textarea class="txt">'+str+'</textarea>');
				break;
			case "checkbox":
				if(tag == "li"){
					var $eles = tdObj.find(tag),
						arr_flag = [];
					$eles.each(function(i,dom){
						arr_flag.push($(this).attr("data-flag"));
					})
					var html = '',
						cat_main = cat['main'],
						isChecked = '';
					html += '<div class="box-checkbox">';
					for(var i = 0; i<cat_main.length; i++){
						var bool = false;
						for(var j = 0; j<arr_flag.length; j++){
							if(arr_flag[j] == cat_main[i]["flag"]){
								bool = true;
								break;
							}
						}
						if(bool){
							isChecked = 'checked="true"';
						}else{
							isChecked = '';
						}
						html += '<p><label><input type="checkbox" value="'+cat_main[i]["title"]+'" data-flag="'+cat_main[i]["flag"]+'" '+ isChecked +' />'+cat_main[i]["title"]+'</label></p>';
					}
					html += '</div>';
					$eles.eq(0).parent().hide();
					tdObj.append(html);
				}else if(tag == "checkbox"){
					tdObj.find("input").removeAttr("disabled");
				}
				break;
			case "select":
				var $ele = tdObj.find(tag).eq(0),
					flag = tdObj.attr("data-flag"),
					cat_sub = cat['sub'];
				var html = '';
				html += '<select>';
				for(var i=0; i<cat_sub.length;i++){
					if(flag && cat_sub[i]["flag"] == flag){
						html += '<option value="'+cat_sub[i]["title"]+'" data-flag="'+cat_sub[i]["flag"]+'" selected="true">'+cat_sub[i]["title"]+'</option>';
					}else{
						html += '<option value="'+cat_sub[i]["title"]+'" data-flag="'+cat_sub[i]["flag"]+'">'+cat_sub[i]["title"]+'</option>';
					}
				}
				html +='</select>';
				$ele.hide();
				tdObj.append(html);
				break;
			default:
				break;
		}
	},
	"save":function(tdObj){
		var model = tdObj.attr("data-model"),
			tag = tdObj.attr("data-tag");
		var isCheckUpdata = false;	//判断是否更新
		switch(model){
			case "text":
				var $ele = tdObj.find(tag).eq(0),
					$input = tdObj.find("input").eq(0);

				//判断是否有更新
				if(!isCheckUpdata){
					if($ele.html() != $.trim($input.val())){
						isCheckUpdata = true;
					}
				}
				//转换值
				if(tag == "a"){
					$ele.html($.trim($input.val())).attr("href",$.trim($input.val())).show();
				}else{
					$ele.html($.trim($input.val())).show();
				}
				$input.remove();
				break;
			case "textarea":
				var $ele = tdObj.find(tag).eq(0),
					$textarea = tdObj.find("textarea").eq(0);

				//判断是否有更新
				if(!isCheckUpdata){
					if($ele.html() != $.trim($textarea.val())){
						isCheckUpdata = true;
					}
				}
				//转换值
				$ele.html($.trim($textarea.val())).show();
				$textarea.remove();
				break;
			case "checkbox":
				if(tag == "li"){
					var $input_checked = tdObj.find("input:checked"),
						$ul = tdObj.find(tag).eq(0).parent(),
						html ="",
						flag = [];
					for(var i = 0; i<$input_checked.length; i++){
						html += '<li data-flag="'+$input_checked.eq(i).attr("data-flag")+'">'+$input_checked.eq(i).val()+'</li>';
						flag.push($input_checked.eq(i).attr("data-flag"));
					}

					//判断是否有更新
					if(!isCheckUpdata){
						if($ul.html() != html){
							isCheckUpdata = true;
						}
					}
					$input_checked.eq(0).parents("div").eq(0).remove();
					$ul.html(html).show();
					tdObj.attr("data-flag",flag.join(" "));
				}else if(tag == "checkbox"){
					var result_start = tdObj.attr("data-result"),
						result_end = "";
					tdObj.find("input").attr("disabled","disabled");
					if(tdObj.find("input").is(":checked")){
						tdObj.attr("data-result","true");
					}else{
						tdObj.attr("data-result","false");
					}
					result_end = tdObj.attr("data-result");
					//判断是否有更新
					if(!isCheckUpdata){
						if(result_start != result_end){
							isCheckUpdata = true;
						}
					}
				}
				break;
			case "select":
				var $input_selected = tdObj.find("select option:selected").eq(0),
					$ele = tdObj.find(tag).eq(0);
				tdObj.attr("data-flag",$input_selected.attr("data-flag"));
				//判断是否有更新
				if(!isCheckUpdata){
					if($ele.html() != $input_selected.val()){
						isCheckUpdata = true;
					}
				}
				$ele.html($input_selected.val()).show();
				$input_selected.parent().remove();
				break;
			default:
				break;
		}
		if(tdObj.parent().attr("data-time")){
			if(isCheckUpdata){
				//有更新
				tdObj.parent().attr("data-time",new Date().getTime());
			}
		}else{
			tdObj.parent().attr("data-time",new Date().getTime());
		}
	},
	"movedown":function(target){
		var $tr = target.parents("tr"),
			$next = $tr.next(),
			oTable = $tr.parents("table");
		if($next.length ==1 ){
			$tr.insertAfter($next);
			$tr.removeClass("hover");
			var $btns = $next.find("td:last").find("button");
			for(var i = 0; i < $btns.length; i++){
				if($btns.eq(i).attr("data-action")=="add"){
					$btns.eq(i).after('<button data-action="insert">插入</button>');
					$btns.eq(i).remove();
					$tr.find("td:last").find("button[data-action='insert']").remove().end().append('<button data-action="add">增加</button>');
				}
			}
			this.evenLine(oTable);
		}
	},
	"moveup":function(target){
		var $tr = target.parents("tr"),
			$prev = $tr.prev(),
			oTable = $tr.parents("table");
		if($prev.length ==1){
			$tr.insertBefore($prev);
			$tr.removeClass("hover");
			var $btns = target.siblings("button");
			for(var i = 0; i < $btns.length; i++){
				if($btns.eq(i).attr("data-action")=="add"){
					$btns.eq(i).after('<button data-action="insert">插入</button>');
					$btns.eq(i).remove();
					oTd = $prev.find("td:last");
					if(oTd.find("button[data-action='add']").length <= 0){
						oTd.find("button[data-action='insert']").remove().end().append('<button data-action="add">增加</button>');
					}
					break;
				}
			}
			this.evenLine(oTable);
		}
	},
	"add":function(trObj,type){
		var type = type?type:1;
		trObj.after(this.createRow(type));
		trObj.find("td:last").find("button[data-action='add']").remove().end().append("<button data-action='insert'>插入</button>");

		var aTd = trObj.next().find("td:not(:last)"),
			oTable = trObj.parents("table");
		for(var i = 0; i<aTd.length;i++){
			aTd.eq(i).attr("data-edit","false");
			this.edit(aTd.eq(i));
		}
		this.evenLine(oTable);
	},
	"insert":function(trObj,type){
		var type = type?type:1;
		trObj.before(this.createRow(type,"insert"));

		var aTd = trObj.prev().find("td:not(:last)"),
			oTable = trObj.parents("table");
		for(var i = 0; i<aTd.length;i++){
			aTd.eq(i).attr("data-edit","false");
			this.edit(aTd.eq(i));
		}
		this.evenLine(oTable);
	},
	"delete":function(trObj,type){
		var result = confirm("确定要删除吗？"),
			$prev = trObj.prev(),
			$next = trObj.next(),
			type = type?type:1;
		if(result){
			if($prev.length >=1){
				var $btns = trObj.find("td:last").find("button");
				for(var i = 0; i < $btns.length; i++){
					if($btns.eq(i).attr("data-action")=="add"){
						oTd = $prev.find("td:last");
						if(oTd.find("button[data-action='add']").length <= 0){
							oTd.find("button[data-action='insert']").remove().end().append('<button data-action="add">增加</button>');
						}
						break;
					}
				}
			}else if($next.length<=0){
				trObj.hide();
				var html = this.createRow(type);
				trObj.before(html);
				//alert(trObj.prev());
				//console.log(html);
				$prev = trObj.prev();
				var aTd = $prev.find("td:not(:last)");
				for(var i = 0; i<aTd.length;i++){
					aTd.eq(i).attr("data-edit","false");
					this.edit(aTd.eq(i));
				}
				alert("已经没有了哦！");
			}
			trObj.remove();
		}
	},
	"getJson":function(type){
		var result = "",
			type = type?type:1,
			aTable = $("#container").find("table");

		switch(type){
			case 1:
				result += 'var cat ={';
				for(var i =0; i<aTable.length;i++){
					result += '"'+aTable.eq(i).attr("data-cat")+'":[';

					var $tr = aTable.eq(i).find("tbody tr");

					for(var j = 0; j<$tr.length;j++){
						if($tr.eq(j).attr("data-status") == "true"){
							if(j==0){
								result += '{';
							}else{
								result += ',{';
							}

							result += '"flag":' + $tr.eq(j).attr("data-flag");
							var aTd = $tr.eq(j).find("td:not(:last)");
							for(var m =0; m<aTd.length;m++){
								var tag = aTd.eq(m).attr("data-tag");
								if(tag == "span" || tag == "a"){
									result += ',"' + aTd.eq(m).attr("data-info") + '":"' + aTd.eq(m).find(tag).eq(0).html() + '"';
								}else if(tag == "li"){
									var aLi = aTd.eq(m).find("li");
									result += ',"' + aTd.eq(m).attr("data-info") + '":';
									result += '[';
									for(var n =0; n<aLi.length;n++){
										if(n !=0){
											result += ',';
										}
										result += aLi.eq(n).attr("data-flag");
									}
									result += ']';
								}else if(tag == "checkbox"){
									result += ',"' + aTd.eq(m).attr("data-info") + '":' + aTd.eq(m).find("input").eq(0).is(":checked");
								}
							}


							result += '}';
						}
					}

					if(i == aTable.length-1){
						result += ']';
					}else{
						result += '],';
					}
				}
				result += '}';
				break;
			case 2:
				result += 'var list =[';
				var $tr = aTable.eq(0).find("tbody tr");

				for(var j = 0; j<$tr.length;j++){
					if($tr.eq(j).attr("data-status") == "true"){
						if(j==0){
							result += '{';
						}else{
							result += ',{';
						}

						result += '"id":'+(j+1);
						var aTd = $tr.eq(j).find("td:not(:last)");
						for(var m =0; m<aTd.length;m++){
							var tag = aTd.eq(m).attr("data-tag");
							if(tag == "span" || tag == "a"){
								if(aTd.eq(m).attr("data-info") == "keyword"){
									result += ',"' + aTd.eq(m).attr("data-info") + '":[';
									var temp_arr = aTd.eq(m).find(tag).eq(0).html().split(" ");
									if(temp_arr.length >=1){
										for(var n = 0; n<temp_arr.length; n++){
											if(n!=0){
												result += ',';
											}
											result += '"'+temp_arr[n]+'"';
										}
									}
									result +=']';
								}else if(aTd.eq(m).attr("data-info") == "subflag"){
									result += ',"' + aTd.eq(m).attr("data-info") + '":"' + aTd.eq(m).attr("data-flag") + '"';
								}else{
									result += ',"' + aTd.eq(m).attr("data-info") + '":"' + aTd.eq(m).find(tag).eq(0).html() + '"';
								}
							}else if(tag == "li"){
								var aLi = aTd.eq(m).find("li");
								result += ',"' + aTd.eq(m).attr("data-info") + '":';
								result += '[';
								for(var n =0; n<aLi.length;n++){
									if(n !=0){
										result += ',';
									}
									result += aLi.eq(n).attr("data-flag");
								}
								result += ']';
							}else if(tag == "checkbox"){
								result += ',"' + aTd.eq(m).attr("data-info") + '":' + aTd.eq(m).find("input").eq(0).is(":checked");
							}
						}

						result += ',"time":'+$tr.eq(j).attr("data-time");

						result += '}';
					}
				}

				result += ']';
				break;
			default:
				break;
		}
		return result;
	},
	"reg":function(tdObj){
		var info = tdObj.attr("data-info");
		if(info){
			return reg[info](tdObj)
		}
	},
	"stopPropagation":function (e) {
	    e = e || window.event;
	    if(e.stopPropagation) { //W3C阻止冒泡方法
	        e.stopPropagation();
	    } else {
	        e.cancelBubble = true; //IE阻止冒泡方法
	    }
	}
}

function showPopJson(str){
	var html = "";
	html += '<div id="mask"><iframe frameborder="0"></iframe></div>';
	html += '<div class="pop pop-settip">';
	html += '<a href="javascript:;" class="pop-close">×</a>';
	html += '<div class="pop-con">';
	html += '<textarea id="j_txt_clip" rows="15">'+str+'</textarea>';
	html += '<div class="btn-outer"><button class="btns btns-large btns-primary" style="width:100%;" id="j_btn_clip">复&nbsp;&nbsp;制</button></div>';
	html += '</div>';
	html += '</div>';
	$("body").append(html);
	//$("#mask,#mask iframe").height($(document).height());
}

$("body").on("click",".pop .pop-close",function(){
	var $this = $(this);
	$this.parent().remove();
	$("#mask").remove();
	$("#j_clip").remove();
});

//复制
var timeout_tip_clip = null;
function copyText() {
    var clip = new ZeroClipboard.Client();

    //鼠标移入
    clip.addEventListener("mouseOver", function (client) {
        client.setText($.trim($("#j_txt_clip").val()));
    });
    //复制完成
    clip.addEventListener('complete', function (client) {
    	clearTimeout(timeout_tip_clip);
    	if($("#j_btn_clip").siblings(".tiptext").length <= 0){
    		$("#j_btn_clip").after('<span class="tiptext tiptext-success">复制成功！</span>');
	        timeout_tip_clip = setTimeout(function(){
	        	$("#j_btn_clip").siblings(".tiptext").remove();
	        },3000);
    	}
    });
    //事件绑定(id)
    clip.glue("j_btn_clip");

    $(window).resize(function(){
	   clip.reposition();
	});
}