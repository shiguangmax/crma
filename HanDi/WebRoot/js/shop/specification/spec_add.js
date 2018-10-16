$(function(){
	//提交验证
	$("#doForm").validate({
	    rules: {
	    	sn: "required",
	    	name: "required",
	    },
	    messages: {
	    	sn: "请输入编号",
	    	name: "请输入名称",
	    },
	    errorPlacement: function(error, element){
	        layer.tips(error[0].textContent, '#'+$(element).attr("id"), {
	        	tipsMore: true,
	        	tips: [3, '#D01405'],
	        });
	    },
	    submitHandler: function(form){
	    	layer.closeAll();
	    	save();
	    	return false;
	    }
	});
	
	//保存
	function save(){
		var json=createJson();
		if(json.length==0){
			layer.msg('请添加规格值', {time:1500}, function(){});
		}else{
			var url="save.jhtml";
	    	if($("#id").val()!=""){
	    		url="update.jhtml";
	    	};
			$.ajax({
				type : 'post',
				url : url,
				datatype : 'JSON',
				data : $("#doForm").serialize(),
				success : function(json) {
					success(json);
				}
			});
		}
	}
	
	var index = parent.layer.getFrameIndex(window.name);
	//成功回调
	function success(json){
		if(json.type=="success"){
			$("#save").attr("disabled", true);
			layer.msg(json.message, {time:2000}, function(){
				window.parent.$("#spec_list").trigger("reloadGrid");
				setTimeout("parent.layer.close("+index+");",1);
			});
		} else {
			layer.msg(json.message, {time:2000}, function(){
			});
		}
	}
	
	var $type=$("#type"), $tb=$("#content_tb"), i=0;
	//添加规格值
	$("#add").click(function(){
		i++
		if($type.val()==0){
			$tb.append('<tr>'+
								'<td class="tb_left"></td>'+
								'<td align="left">排序：<input type="text" class="orders" style="width:40px" value="'+i+'" maxlength="2">'+
								' &nbsp;&nbsp;名称：<input type="text" class="descVal" style="width:100px" value="" maxlength="25">'+
								' &nbsp;&nbsp;<i class="fa fa-times fa-lg" style="color:red"></i></td>'+
							'</tr>');
		}else{
			$tb.append('<tr>'+
								'<td class="tb_left"></td>'+
								'<td align="left">排序：<input type="text" class="orders" style="width:40px" value="'+i+'" maxlength="2">'+
								' &nbsp;&nbsp;颜色：<input type="text" class="descVal" style="width:100px" value="" maxlength="25">'+
								' &nbsp;&nbsp;<input type="color" class="color" style="width:60px">'+
								' &nbsp;&nbsp;<i class="fa fa-times fa-lg" style="color:red"></i></td>'+
							'</tr>');
		}
	})
	
	drawValues();
	//编辑渲染规格值
	function drawValues(){
		if($("#id").val()==""){
			return false;
		};
		$.ajax({
			type : 'post',
			url : 'valueslistjson.jhtml',
			datatype : 'JSON',
			data : {id: $("#id").val()},
			success : function(json) {
				for(var j=0; j<json.length; j++) {
					i=j+1;
					if($type.val()==0){
						$tb.append('<tr>'+
		    								'<td class="tb_left"></td>'+
		    								'<td align="left">排序：<input type="text" class="orders" style="width:40px" value="'+json[j].orders+'" maxlength="2">'+
		    								' &nbsp;&nbsp;名称：<input type="text" class="descVal" style="width:100px" value="'+json[j].descVal+'" maxlength="25">'+
		    								' &nbsp;&nbsp;<i class="fa fa-times fa-lg" style="color:red"></i></td>'+
	    								'</tr>');
					}else{
						$tb.append('<tr>'+
		    								'<td class="tb_left"></td>'+
		    								'<td align="left">排序：<input type="text" class="orders" style="width:40px" value="'+json[j].orders+'" maxlength="2">'+
		    								' &nbsp;&nbsp;颜色：<input type="text" class="descVal" style="width:100px" value="'+json[j].descVal+'" maxlength="25">'+
		    								' &nbsp;&nbsp;<input type="color" class="color" style="width:60px" value="'+json[j].color+'">'+
		    								' &nbsp;&nbsp;<i class="fa fa-times fa-lg" style="color:red"></i></td>'+
	    								'</tr>');
					}
				}
			}
		});
	}
	
	//删除规格值
	$tb.delegate("i","click",function(){
		$(this).parent().parent().remove();
	});
	
	//构建json
	function createJson(){
		var json=[];
		$("#content_tb tr:gt(3)").each(function(i){
			var item={};
		    $(this).children("td").each(function(i){
		        item.orders=$(this).find(".orders").val();
		        item.descVal=$(this).find(".descVal").val();
		        if($(this).find(".color").val()!=undefined){
		        	 item.color=$(this).find(".color").val();
		        }
		    });
		    json[i]=item;
		});
		$("#specvalues").val(JSON.stringify(json));
		return json;
	}
	
	//类型切换
	$type.change(function(){
		i=0;
		$("#content_tb tr:gt(3)").each(function(i){
		    $(this).remove();
		});
	})
	
	//取消关闭
	$("#cancel").click(function(){
		setTimeout("parent.layer.close("+index+");",1);
	})
	
})