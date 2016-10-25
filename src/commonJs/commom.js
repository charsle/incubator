require('es6-promise').polyfill();
require('isomorphic-fetch');
//手机验证
export const mobileReg = /^(13|14|15|18|17)[0-9]{9}$/;
//密码验证
export const passwordReg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~\(\)\`\|\\\{\}\[\]\;\:\'\"\,\.\/\<\>\?\-\=\_\+\.]{6,16}$/;
/**
 * 封装ajax  fath
 * @param {Object} url 接口路径
 * @param {Object} parmas 接口参数
 * @param {Object} _callback  数据回调
 * @param {Object} isEncrypt 参数是否加密
 */
export function fethAsync(url, parmas, _callback) {
	parmas = parmas ? parmas : '';
	fetch(url, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
		},
		body: parmas
	}).then(respones => {
		respones.json().then(res => {
			if(res.msg==401){
				location.href="login.html";
				return;
			}
			if(_callback !== undefined) {
				_callback(res);
			}
		});
	});
}
/**
 * 全局提示
 */
export function tipTools() {
	Array.prototype.slice.call(arguments);
	if(arguments.length > 1) {
		layer.tips(arguments[0], arguments[1], {
			tips: [3, '#000'],
			time: 2000
		});
	} else {
		layer.msg(arguments[0], {
			time: 2000
		});
	}
}
/**
 * 设置cookie
 */
export function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
/**
 * 获取cookie
 */
export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
/**
 * 删除cookie
 */
export function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
/**
 * 倒计时
 */
var wait = 60;
var timer = null;
export function sendTime(obj) {
	let textId = document.getElementById(obj.target.id);
	if(wait == 0) {
		clearTimeout(timer);
		wait = 60;
		obj.target.removeAttribute('disabled', 'disabled');
		textId.innerHTML = '重新获取';
	} else {
		wait--;
		obj.target.setAttribute('disabled', 'disabled');
		textId.innerHTML = wait + 's'
		timer = setTimeout(() => {
			sendTime(obj);
		}, 1000);
	};
}