<template>
	<div id="app">
		<h3><img src="../../assets/Group-1.png" width="200"/></h3>
		<div class="box">
			<div class="row">
				<input type="text" class="form-control h40" placeholder="请输入您的手机号码" v-model="login_tel" id="login_tel" maxlength="11" />
			</div>
			<div class="row mt15">
				<input type="password" class="form-control h40" placeholder="请输入您的密码" v-model="login_pwd" id="login_pwd" maxlength="20" />
			</div>
			<div class="row mt15">
				<div class="col-xs-8">
					<input type="text" class="form-control h40" placeholder="请输入验证码" v-model="code" id="resert_code" maxlength="10" />
				</div>
				<div class="col-xs-4">
					<img :src="codeUrl" width="100%" height="34" alt="验证码" @click="changeCode" class="pointer"/>
					<!--<a href="javascript:;" class="submitLogin getCode" @click="getResertCode"><img src="../../assets/logo.png"/></a>-->
				</div>
			</div>
			<div class="row mt15">
				<a href="javascript:;" class="btn btn-block subBasic submitLogin" @click="loginGo">登录</a>
			</div>
		</div>
	</div>
</template>

<style>
	html {
		height: 100%;
	}

	body {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: #f1f1f1;
	}

	#app {
		color: #2c3e50;
		margin-top: -50px;
		max-width: 600px;
		min-width: 400px;
		font-family: Source Sans Pro, Helvetica, sans-serif;
		text-align: center;
	}
	.box{
		margin-top: 30px;
		padding: 30px 50px;
		border: 2px dashed #dedede;
	}
</style>
<script type="text/javascript">
	import {
		mobileReg,
		tipTools,
		passwordReg,
		fethAsync,
		setCookie
	} from '../../commonJs/commom';
	import {
		LOGIN_URL,
		CODE_URL,
		COOKIE_URL
	} from '../../api/config';
	export default {
		data: function() {
			return {
				login_tel: '15388888888',
				login_pwd: '111111',
				code:'',
				codeUrl:CODE_URL
			}
		},
		ready(){
			var slef = this;
			this.getSession();
			$(document).keydown(function(event){
				if(event.keyCode==13){
					slef.loginGo();
				}
			});
		},
		methods: {
			getSession(){
				fethAsync(COOKIE_URL, '', res => {

				})
			},
			loginGo: function() {
				if(!mobileReg.test(this.login_tel)) {
					tipTools('手机号码输入不合法,请重新输入', '#login_tel');
					return;
				}
				if(!passwordReg.test(this.login_pwd)) {
					tipTools('密码至少6位', '#login_pwd');
					return;
				}
				var params = 'account=' + this.login_tel + '&password=' + this.login_pwd + '&code=' + this.code;
				fethAsync(LOGIN_URL, params, res => {
					if(res.success) {
						tipTools('登录成功');
						setCookie('basicInfo',JSON.stringify(res.result));
						location.href = 'main.html';
					} else {
						this.changeCode()
						tipTools(res.msg);
					}
				})
			},
			changeCode(){
				this.codeUrl=CODE_URL+'?time='+(+new Date())
			}

		}
	}
</script>
