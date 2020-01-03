/**
 * jquery ajax 请求封装，统一处理异常信息
 * @param url
 * @param method
 * @param success
 * @param error
 * @returns
 */
function callApi(url, params, method, success, error ) {
	
	$.ajax({
		url: "/hlwjg" + url,
		data: params,
		method: method ? method : 'POST',
		scriptCharset: 'UTF-8',
		success: function(resp){
			
			if(resp.status == 200) {
				if(typeof(success) == 'function'){
					success(resp);
				}
			}else {
				if(resp.status == -100100 || resp.status == -100200 || resp.status == -100300 || resp.status == -100400 || resp.status == -500200){
					var errHtml="";
					if(typeof(resp.message) != 'undefined'){
						errHtml += '系统消息：'+ resp.message + '<br/>';
					}
					 openMsgModal(errHtml);
					 return 
				}
				var errHtml="";
				if(typeof(resp.message) != 'undefined'){
					errHtml += '系统消息：'+ resp.message + '<br/>';
				}
					errHtml += '返回状态码：'+ resp.status + '<br/>'+			
						       url + '请求失败, 请联系管理员!<br/>';
				if(typeof(resp.detailMsg) != 'undefined'){
					errHtml += '异常详细消息：'+ resp.detailMsg;
				}
		      openMsgModal(errHtml);
			}
		},
		error: function(e) {
			if(e.status == 603){ 
				goToInnerUrl("/page/login.html");
			} else {
				if(e.status == -100100 || e.status == -100200 || e.status == -100300 || e.status == -100400 || e.status == -500200){
					var errHtml="";
					if(typeof(e.message) != 'undefined'){
						errHtml += '系统消息：'+ e.message + '<br/>';
					}
					 openMsgModal(errHtml);
					 return 
				}
				var errHtml="";
				if(typeof(e.message) != 'undefined'){
					errHtml += '系统消息：'+ e.message + '<br/>';
				}
					errHtml += '返回状态码：'+ e.status + '<br/>'+			
						       url + '请求失败, 请联系管理员!<br/>';
				if(typeof(e.detailMsg) != 'undefined'){
					errHtml += '异常详细消息：'+ e.detailMsg;
				}
				openMsgModal(errHtml);
			}
		}
	});

}

/**
 * jquery ajax 请求封装，统一处理异常信息,同步调用
 * @param url
 * @param method
 * @param success
 * @param error
 * @returns
 */
function callApiSync(url, params, method, success, error ) {
	$.ajax({
		url: "/hlwjg" + url,
		data: params,
		async:false,
		method: method ? method : 'POST',
		scriptCharset: 'UTF-8',
		success: function(resp){
			if(resp.status == 200) {
				if(typeof(success) == 'function'){
					success(resp);
				}
			}else {
		
				if(resp.status == -100100 || resp.status == -100200 || resp.status == -100300 || resp.status == -100400 || resp.status == -500200){
					var errHtml="";
					if(typeof(resp.message) != 'undefined'){
						errHtml += '系统消息：'+ resp.message + '<br/>';
					}
					 openMsgModal(errHtml);
					 return 
				}
				
				var errHtml="";
				if(typeof(resp.message) != 'undefined'){
					errHtml += '系统消息：'+ resp.message + '<br/>';
				}
					errHtml += '返回状态码：'+ resp.status + '<br/>'+			
						       url + '请求失败, 请联系管理员!<br/>';
				if(typeof(resp.detailMsg) != 'undefined'){
					errHtml += '异常详细消息：'+ resp.detailMsg;
				}
				openMsgModal(errHtml);
			}
		},
		error: function(e) {
			if(e.status == 603){
				goToInnerUrl("/page/login.html");
			} else {
				if(e.status == -100100 || e.status == -100200 || e.status == -100300 || e.status == -100400 || e.status == -500200){
					var errHtml="";
					if(typeof(e.message) != 'undefined'){
						errHtml += '系统消息：'+ e.message + '<br/>';
					}
					 openMsgModal(errHtml);
					 return 
				}
				var errHtml="";
				if(typeof(e.message) != 'undefined'){
					errHtml += '系统消息：'+ e.message + '<br/>';
				}
					errHtml += '返回状态码：'+ e.status + '<br/>'+			
						       url + '请求失败, 请联系管理员!<br/>';
				if(typeof(e.detailMsg) != 'undefined'){
					errHtml += '异常详细消息：'+ e.detailMsg;
				}
		    	openMsgModal(errHtml);
			}
		}
	});

}

/**
 * 根据code初始化select组件
 * @param selectId select组件id
 * @param params {"pid":"","smodule":""}
 * @returns
 */
function initSelectByCode(selectId,params,isQuery){
	var moduleList = null;
	callApiSync("/findCodeListByPid", params, 'POST', function(resp){
		moduleList = resp.data;
		var options = $("#"+selectId)[0].options;
		if(isQuery){
			var queryOption = document.createElement("OPTION");
			queryOption.text = "请选择";
			queryOption.value = "";
			options.add(queryOption);
		}
		for(var i = 0; i < moduleList.length; i++){
			var option = document.createElement("OPTION");
			option.text = moduleList[i].codeName;
			option.value = moduleList[i].codeNumber;
			options.add(option);
		}
	});
	return moduleList;
}

/**
 * 根据字典code获取codeList
 * @param params {"pid":"","smodule":""}
 * @returns
 */
function findCodeListByPid(params){
	var moduleList = null;
	callApiSync("/findCodeListByPid", params, 'POST', function(resp){
		moduleList = resp.data;
	});
	return moduleList;
}

/**
 * 页面跳转
 * @param page
 * @returns
 */
function goToPage(page) {
	window.location.href = window.location.pathname + '#' + page;
}

/**
 * 跳转到网站内绝对路径，如/page/home.html
 * @param url
 * @returns
 */
function goToInnerUrl(url) {
	var href = window.location.href;
	window.location.href = href.substring(0,href.indexOf("/page/")) + url;
}


/**
 * 表单校验
 * @param formObj
 * @returns
 */
function validForm(formObj) {
	var res = true;
	formObj.find("input[type='text'], select, textarea").each(function(){
		var validRes = valid($(this));
		var faultP = formObj.find("p.fault-msg[for='"+this.id+"']");
		var title = faultP.attr('data-name');
		if(validRes == 0) {
			faultP.addClass("hide");
		} else if(validRes == 1) {
			faultP.find("span").text(title + "不能为空。");
			faultP.removeClass("hide");
			res = false;
		} else if(validRes == 2) {
			faultP.find("span").text(title + "内容过长，最长为"+$(this).attr('data-length')+"字符。");
			faultP.removeClass("hide");
			res = false;
		} else if(validRes >= 3) {
			faultP.find("span").text(title + "内容格式有误,应为"+validDataType[validRes].name+"。");
			faultP.removeClass("hide");
			res = false;
		}
	});
	return res;
}
function bindFormValid(formObj) {
	formObj.on('change', "input[type='text'], select, textarea", function(){
		var validRes = valid($(this));
		var faultP = formObj.find("p.fault-msg[for='"+this.id+"']");
		var title = faultP.attr('data-name');
		if(validRes == 0) {
			faultP.addClass("hide");
		} else if(validRes == 1) {
			faultP.find("span").text(title + "不能为空。");
			faultP.removeClass("hide");
		} else if(validRes == 2) {
			faultP.find("span").text(title + "内容过长，最长为"+$(this).attr('data-length')+"字符。");
			faultP.removeClass("hide");
		} else if(validRes == 5) {
			faultP.find("span").text("格式有误，请重新输入");
			faultP.removeClass("hide");
		} else if(validRes >= 3) {		
			faultP.find("span").text(title + "内容格式有误,应为"+validDataType[validRes].name+"。");
			faultP.removeClass("hide");
		} else{
			faultP.addClass("hide");
		}
	});
}


var validDataType= {
		   "3": { "key": "id-card", "name": "身份证" },
		   "4": { "key": "number", "name": "数字" },
		   "5": { "key": "phone", "name": "电话号码" },
		   "6": { "key": "balance", "name": "金额" },
		   "7": { "key": "sampleRatio", "name": "0到1之间的数字，最多保留2位小数" } //抽查比例
		};
/**
 * 校验文本框，返回1为必填未填内容，返回2为文本超长， 返回3为文本格式不对
 * @param obj
 * @returns
 */
function valid(obj) {
	var type = obj.attr('data-type');
	var required = obj.hasClass('require');
	var dataL = obj.attr('data-length');
	if(required && CheckEmpty(obj)) { //非空
		return 1;
	}
	if(dataL && !CheckEmpty(obj) && obj.val().length  > dataL) { 
		return 2;
	}
	var res = 0;
	if(!CheckEmpty(obj)) {
		if(type == 'id-card'){ //身份证
			res = CheckCard(obj) ? 3 : 0;
		} else if(type == 'number') { //数字	
			res = CheckNumber(obj) ? 4 : 0;
		} else if(type == 'phone') {
			res = CheckPhone(obj) ? 5 : 0;
		} else if(type == 'balance') {
			res = CheckDouble(obj) ? 6 : 0;
		} else if(type == 'sampleRatio') {
			res = CheckNumberPercent(obj) ? 7 : 0;
		}
	}
	return res;
}

//检验特殊字符
function checkTS(str){
	var str = $(str).val();
	var pattern = new RegExp("[`~!@#$^&*()-+—_=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	if(pattern.test(Trim(str))){
			return 1;
	}
	return 0;
}

//检验特殊字符串
function AntiSqlValid(str){
	var str = $(str).val();
	var re= /select|update|delete|exec|insert|where|script|count|drop|-|'|"|=|;|>|<|%/i;
	if (re.test(Trim(str))) {
		return 1;
	}
	return 0;
}


function Trim(str) {  
	//字符串去除前后空格
	return str.replace(/(^\s*)|(\s*$ )/g, "");
}

/*
* CheckEmpty('#objid');
* CheckEmpty('.objclass');
*/
function CheckEmpty(str) {  //判断输入为空或者输入placeholder值
	var StrValue = $(str).val();
	if(!StrValue) {
		return 1;
	}
	var StrPlaceholder = $(str).attr('placeholder');
	if (Trim(StrValue) == '' || Trim(StrValue) == StrPlaceholder) {
		return 1;
	}else{
		return CheckScript(str);
	}
}


function CheckStrEmpty(StrValue) {  //判断输入为空或者输入placeholder值
	if(!StrValue) {
		return 1; 
	}	
	if (Trim(StrValue) == '') {
		return 1;
	}else{
		return 0;
	}
}


function CheckScript(str) {    //判读输入的特殊字符
	var ScriptStr =/<[\/\!]*[^<>]*>/;
	if (ScriptStr.test(Trim($(str).val()))) {
		var astr = $(str).attr('placeholder').indexOf('请输入') == -1 ? $(str).attr('placeholder')+'输入有误,请重新输入'  :  $(str).attr('placeholder').replace('请输入','') +'输入有误,请重新输入';
		return 1;
	}
	return 0;
}


/*
* CheckName('#objid');
*/
function CheckName(str) {   //验证姓名输入有误
	var str = $(str).val();
	var NameStr = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	if (!NameStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}


/*
* CheckChinese('#objid');
*/
function CheckChinese(str) {  //验证是否输入纯中文
	var str = $(str).val();
	var ChineseStr = /^[\u4e00-\u9fa5]+$/;
	if (!ChineseStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}

/*
* CheckNumber('#objid');
*/
function CheckNumber(obj) {  //验证是否输入纯数字
	//console.log(str)
	var str = obj.val();
	var NumberStr = /^[0-9]*$/;
	if (!NumberStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}

}

/*
 * CheckDouble('#objid');
 */
function CheckDouble(obj) {  //验证是否输入正浮点数
	var str = obj.val();
	var NumberStr = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	if (!NumberStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
	
}


/*
* CheckCard('#objid');
*/
function CheckCard(obj) {  //验证身份证号是否正确
	var str = obj.val();
	var CardStr = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if (!CardStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}

}

/*
* CheckPhone('#objid');
*/
function CheckPhone(obj) {  //验证手机号是否正确
	var str = obj.val();
	var PhoneStr = /^[1][3,4,5,7,8,9][0-9]{9}$|^[0][0-9]{2,3}[\-]*[0-9]{7,8}$/;
	if (!PhoneStr.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}


/*
* CheckNumberAbc('#objid');
*/
function CheckNumberAbc(str) {  //验证26个字母加数字
	var str = $(str).val();
	var NumberAbc = /^[A-Za-z0-9]+$/;
	if (!NumberAbc.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}
//验证百分比
function CheckNumberP(str){ //验证0到100,最多2位小数
	var str = $(str).val();
	var NumberP = /^(\d|[1-9]\d|100)(\.\d{1,2})?$/
	if (!NumberP.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}

/*function CheckNumberPercent(str){ //验证0到1
	var str = $(str).val();
	var NumberAbc = /^[0-1]$|^0\.[1-9]\d*$/;
	if (!NumberAbc.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}*/

function CheckNumberPercent(obj){ //验证0到1,最多2位小数

	var str = obj.val();
	var NumberPercent = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
	if (!NumberPercent.test(Trim(str))) {
		return 1;
	}else{
		return 0;
	}
}
//modal弹窗出来内容

function openMsgModal(content, callback){
	$("#msgModal").modal({ backdrop: 'static', keyboard: false });
	$("#msgModal").find(".tooltips-msg").html(content);
	if(callback && callback instanceof Function){
		$("#msgModal").find(".btn-confirm").unbind();
		$("#msgModal").find(".btn-confirm").click(function(){
			callback(true);
			$("#msgModal").modal("hide");
		})
	}
}
//内容，确认函数
function openConfirmModal(content, callback){
	var isOk;
	$("#confirmModal").modal({ backdrop: 'static', keyboard: false });
	$("#confirmModal").find(".tooltips-msg").text(content);
	if(callback && callback instanceof Function){
		$("#confirmModal").find(".btn-confirm").unbind();
		$("#confirmModal").find(".btn-confirm").click(function(){
			callback(true);
			$("#confirmModal").modal("hide");
		})
	}
	
}

//序列化表单数据为json格式
function serializeObject(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
}
//loading
function showLoading(){
	$("#loadingModal").modal("show");
}
function hideLoading(){
	$("#loadingModal").modal("hide");
}


//获取url参数
function getUrlParam(paramName){	
	var query = window.location.href.substring(window.location.href.indexOf("?")+1);	
	var params = query.split("&");
	for(var i = 0;i<params.length;i++){
		var par = params[i].split("=");
		if(par[0] == paramName){
			return par[1];
		}
	}
}

if(typeof(window.pageCache) == 'undefined'){
	window.pageCache = {};
}

function savePageCache() {
	var hash = window.location.hash.replace(/\?.*$/g,"");
	var pageCache = {};
	var inputs = $("#content input[type=text],input[type=hidden],select");
	for(var idx in inputs) {
		var input = inputs[idx];
		if(!CheckStrEmpty(input.value) && !CheckStrEmpty(input.id) ){
			pageCache[input.id] = input.value;
		}
	}
	window.pageCache[hash] = pageCache;
}

function loadPageCache() {
	var hash = window.location.hash.replace(/\?.*$/g,"");
	if(window.pageCache[hash]){
		var pageCache = window.pageCache[hash];
		var inputs = $("#content input[type=text],input[type=hidden],select"); 
		for(var idx in inputs) {
			var input = inputs[idx];
			if(pageCache[input.id]){
				$(input).val(pageCache[input.id]);
			}
		}
	}
}

function getPageCacheById(id) { 
	var hash = window.location.hash.replace(/\?.*$/g,"");
	if(window.pageCache[hash]){
		return window.pageCache[hash][id];
	}
}

function clearPageCache() {
	var hash = window.location.hash.replace(/\?.*$/g,"");
	window.pageCache[hash] = null;
}

//判断登录
function checkIsLogin() {
	var status = false;
	$.ajax({
		url: "/hlwjg/getUserDetailFromSession",
		async:false,
		method: 'POST',
		success: function(resp) {
			var item = resp.data;
			if(resp.data != null){
				status = true;
				//$("#login").css('visibility', 'hidden');
				$("#login").css("display", "none");
				$("#logout").css('display', 'block');
			} else {
				//$("#login").css('visibility', 'visible');
				$("#login").css("display", "block");
				$("#logout").css('display', 'none');
			}
		}
	});
	return status;

}

Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
