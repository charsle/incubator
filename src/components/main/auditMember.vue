<template>
	<div class="p20">

		<div class="ptb20" v-if="list.is_handler==1">
			<a href="javascript:;" class="btn btn-success" @click="apply(0)">通过</a>
			<a href="javascript:;" class="btn btn-success ml10" @click="apply(2)">不通过</a>
		</div>

		<div class="row">
			<p v-if="list.is_handler!=1">申请状态：
				<span v-if="list.is_handler ==0">审核通过</span>
				<span v-if="list.is_handler ==2">未通过</span>
			</p>
			<p>申请类型：{{list.type==1?'创业者':'投资者'}}</p>
			<p>用户昵称：{{list.name}}</p>
			<p>身份证号：{{list.card}}</p>
			<p>营业执照：{{list.license}}</p>
			<p>入驻园区：{{list.park}}</p>
			<p>关注领域：{{list.park}}</p>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h5>用户授权书</h5>
				<img :src="list.entrust_url | getUrl" width="100" />
			</div>
			<div class="col-md-6">
				<h5>身份证件照</h5>
				<img :src="list.card_url | getUrl" width="100" />
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
		getCookie
	} from '../../commonJs/commom';
	import {
		WEB_HANDLER_APPLY_URL
	} from '../../api/config';
	export default {
		props: ['list'],
		data() {
			return {
				basicInfo: JSON.parse(getCookie('basicInfo'))
			}
		},
		methods: {
			apply(tag) {
				var params = 's_id=' + this.list.s_id + '&is_handler=' + tag + '&account=' + this.basicInfo.account
				fethAsync(WEB_HANDLER_APPLY_URL, params, res => {
					if(res.success) {
						console.log(res);
						layer.closeAll()
						this.$store.dispatch('APPLY_LIST',res.result)
						location.href="#!/navOneAuditAll"
					} else {
						tipTools(res.msg)
					}
				})

			}
		}
	}
</script>
