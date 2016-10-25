<template>
	<div class="col-xs-12 col-md-12 p20">
		<div class="row">
			<h4><i class="glyphicon glyphicon-hdd"></i>&nbsp;系统信息</h4>
		</div>
		<div class="col-md-8 mt10">
			<table class="table system" border="0">
				<tr>
					<td>本次登录IP：{{allInfo.this_login_ip}}</td>
					<td>上次登录IP：{{allInfo.last_login_ip}}</td>
					<td>上次登录时间：{{allInfo.last_login_time}}</td>
				</tr>
				<tr>
					<td>注册用户：{{allInfo.registerCount}}</td>
					<td>创业者：{{allInfo.produceCount}}</td>
					<td>投资人：{{allInfo.investCount}}</td>
				</tr>
				<tr>
					<td>今日待审核：{{allInfo.authCount}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		getCookie
	} from '../../commonJs/commom';
	export default {
		data: function() {
			return {
				allInfo:JSON.parse(getCookie('basicInfo'))
			}
		},
		ready(){
			console.log(this.allInfo);
		},
		methods: {

		}
	}
</script>
