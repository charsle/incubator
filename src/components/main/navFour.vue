<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; 修改密码
		</div>
		<div class="row mt20">
			<div class="row changePWD">
				<p><span class="w100px">原密码:</span><input v-model="user_pwd" placeholder="请输入原密码" type="password" name="" id="user_pwd" value="" /></p>
				<p><span class="w100px">新密码:</span><input  v-model="userN_pwd" placeholder="请输入新密码" type="password" name="" id="userN_pwd" value="" /></p>
				<p><span class="w100px">确认密码:</span><input  v-model="userR_pwd" placeholder="请确认新密码" type="password" name="" id="userR_pwd" value="" /></p>
			</div>
			<div class="row mt10">
				<a href="javascript:;" class="btn btn-sm btn-primary" @click="changePWD">确认</a>
				<a href="javascript:;" class="btn btn-sm btn-default" @click="clears">清空</a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		passwordReg,
		tipTools,
		fethAsync,
		getCookie
	} from '../../commonJs/commom';
	import {
		EDITPWD_URL
	} from '../../api/config';
	export default {
		data: function() {
			return {
				user_pwd: '',
				userN_pwd: '',
				userR_pwd:'',
				account: JSON.parse(getCookie('basicInfo'))
			}
		},
		methods: {

			changePWD: function() {
				if(!passwordReg.test(this.user_pwd)) {
					tipTools('请输入您正确的密码', '#user_pwd');
					return;
				}
				if(!passwordReg.test(this.userN_pwd)) {
					tipTools('密码至少6位', '#userN_pwd');
					return;
				}
				if(this.userN_pwd!=this.userR_pwd){
					tipTools('两次密码输入不一致，请重新输入', '#userR_pwd');
					return;
				}
				var params = 'account=' +this.account.account +'&old_password=' + this.user_pwd + '&new_password=' + this.userN_pwd+'&conf_password='+this.userR_pwd;
				fethAsync(EDITPWD_URL, params, res => {
					if(res.success) {
						tipTools('修改成功');
						this.clears();
					} else {
						tipTools(res.msg);
					}
				})
			},
			clears: function(){
				this.user_pwd='';
				this.userN_pwd='';
				this.userR_pwd='';
			}

		}
	}
</script>
