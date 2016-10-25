<template>
	<div class="p10 pt2">

		<div class="pb10" v-if="list.status!=1">
			<a href="javascript:;" class="btn btn-primary" @click="deleteProject(list.s_id)">撤回</a>
		</div>

		<div class="row">
			<div class="col-md-2">
				<img :src="list.logo_url | getUrl" style="max-width: 100%;" />
			</div>
			<div class="col-md-9" style="padding-left: 20px!important;">
				<p>品牌名称：{{list.name}}</p>
				<p>项目标题：{{list.title}}</p>
				<p>行业领域：{{list.zone}}</p>
				<p>网页地址：{{list.website}}</p>
				<p>融资阶段：{{list.stage}}</p>
				<p>资金需求：{{list.demand}}</p>
				<p>项目地区：{{list.area}}</p>
				<p>产品优势：<br>{{list.advantage}}</p>
				<p>发展规划：<br>{{list.plan}}</p>
				<p>相似产品：<br>{{list.same}}</p>
				<p>其他：<br>{{list.other==''?'无':list.other}}</p>
			</div>
			<!--<p v-if="list.is_handler!=1">申请状态：
				<span v-if="list.is_handler ==0">审核通过</span>
				<span v-if="list.is_handler ==2">未通过</span>
			</p>-->

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
		WEB_RECALL_PROJECT_URL
	} from '../../api/config';
	export default {
		props: ['list'],
		data() {
			return {
				basicInfo: JSON.parse(getCookie('basicInfo'))
			}
		},
		methods: {
			deleteProject(tag) {
				var params = 's_id=' + tag + '&account=' + this.basicInfo.account;
				var _this=this;
				layer.confirm('执行此操作将撤回已发布的项目，并且不可恢复。您确定要这样做吗?', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						fethAsync(WEB_RECALL_PROJECT_URL, params, res => {
							if(res.success) {
								_this.$store.dispatch('RECALL_PROJECT', res.result);
								layer.closeAll()
							} else {
								tipTools(res.meg)
							}
						})

					})

			}
		}
	}
</script>