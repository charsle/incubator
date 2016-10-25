<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp;
			<a href="#!/navOneAuditAll">所有会员</a>&nbsp;>&nbsp; 会员详情
		</div>
		<div class="w80">
			<h5 class="detaileTitle">基本信息</h5>
			<div class="row">
				<div class="col-xs-3 pr20">
					<img :src="infoList.head_url | getUrl" width="100%" />
				</div>
				<div class="col-xs-6">
					<p><span class="w100px">所属组别</span>{{infoList.type==1?'创业者':'投资者'}}</p>
					<p><span class="w100px">用户状态</span>
						<span v-if="infoList.is_handler==0">审核通过</span>
						<span v-if="infoList.is_handler==1">待审核</span>
						<span v-if="infoList.is_handler==2">未通过</span>
						<span v-if="infoList.is_handler==‘’">正常</span>
					</p>
					<p><span class="w100px">用户名</span>{{infoList.phone}}</p>
					<p><span class="w100px">昵称</span>{{infoList.name}}</p>
					<p><span class="w100px">邮箱账号</span>{{infoList.email}}</p>
					<p><span class="w100px">公司:</span>{{infoList.company}}</p>
					<p><span class="w100px">职位:</span>{{infoList.position}}</p>
					<p><span class="w100px">座机:</span>{{infoList.telephone}}</p>
					<p><span class="w100px">QQ:</span>{{infoList.qq}}</p>
					<p><span class="w100px">微信:</span>{{infoList.webchat}}</p>
				</div>
			</div>
		</div>
		<div class="w80">
			<h5 class="detaileTitle">认证记录</h5>
			<div class="row">
				<table class="table table-bordered tableTitle">
					<thead>
						<tr>
							<th>认证类型</th>
							<th>申请时间</th>
							<th>认证状态</th>
							<th>审核人</th>
							<!--<th>操作</th>-->
						</tr>
					</thead>
					<tbody>
						<template v-if="authList.length!=0">
							<tr v-for="item in authList">
								<td>{{item.type==1?'创业者':'投资者'}}</td>
								<td>{{item.submit_time}}</td>
								<td>
									<span v-if="item.is_handler==0">审核通过</span>
									<span v-if="item.is_handler==1">未审核</span>
									<span v-if="item.is_handler==2">未通过</span>
								</td>
								<td>{{item.account}}</td>
								<!--<td>
									<a href="javascript:;" @click="lookDetail(item.s_id)">{{item.is_handler==0?'查看':'审核'}}</a>
								</td>-->
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="5">暂无数据</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
		<div class="w80">
			<h5 class="detaileTitle">项目记录</h5>
			<div class="row">
				<table class="table table-bordered tableTitle">
					<thead>
						<tr>
							<th>品牌名称</th>
							<th>项目标题</th>
							<th>状态</th>
							<th>撤回人</th>
							<!--<th>操作</th>-->
						</tr>
					</thead>
					<tbody>
						<template v-if="project.length!=0">
							<tr v-for="item in project">
								<td>{{item.name}}</td>
								<td>{{item.title}}</td>
								<td>
									<span v-if="item.status ==0">正常</span>
									<span v-if="item.status ==1">已撤回</span>
								</td>
								<td>{{item.account }}</td>
								<!--<td>
									<a href="javascript:;" @click="lookProjectDetail(item.s_id)">查看</a>
								</td>-->
							</tr>
						</template>
						<template v-else>
							<tr>
								<td colspan="5">暂无数据</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="auditMember" style="display: none;">
		<audit-member :list='list'></audit-member>
	</div>
	<div id="projectMember" style="display: none;">
		<project-member :list='projectList'></project-member>
	</div>
</template>

<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
	} from '../../commonJs/commom';
	import {
		SEARCH_BY_ACCOUNT_URL,
		QUERY_HENDLER_URL,
		WEB_QUERY_PROJECT_URL
	} from '../../api/config';
	import auditMember from './auditMember'
	import projectMember from './projectMember'
	export default {
		data() {
				return {
					infoList: {},
					authList: [],
					project: [],
					list: '' || {},
					projectList: '' || {}
				}
			},
			route: {
				data: function(transition) {
					var sId = transition.to.params.id;
					var params = 's_id=' + sId;
					console.log(params);
					fethAsync(SEARCH_BY_ACCOUNT_URL, params, res => {
						if(res.success) {
							this.infoList = res.result;
							this.authList = res.result.authList;
							this.project = res.result.project;
						}
					})
				}
			},
			components: {
				auditMember,
				projectMember
			},
			vuex: {
				getters: {
					getApplyList(state) {
						return state.applyList;
					}
				}
			},
			watch: {
				getApplyList: {
					handler() {
						this.infoList = this.getApplyList.result;
						this.authList = this.getApplyList.authList;
						this.project = this.getApplyList.project;
					}
				}
			},
			methods: {
				lookDetail(sid) {
					console.log(sid);
					fethAsync(QUERY_HENDLER_URL, 's_id=' + sid, res => {
						if(res.success) {
							this.list = res.result;
							console.log(res)
							layer.open({
								type: 1,
								closeBtn: 0, //不显示关闭按钮
								shift: 2,
								area: ['600px', '500px'],
								shadeClose: true, //开启遮罩关闭
								content: $('#auditMember'),
							});
						}
					})
					return;

				},
				lookProjectDetail(sid) {
					console.log(sid);
					fethAsync(WEB_QUERY_PROJECT_URL, 's_id=' + sid, res => {
						if(res.success) {
							this.projectList = res.result;
							console.log(res)
							layer.open({
								type: 1,
								//								btn:['撤回','取消'],
								closeBtn: 0, //不显示关闭按钮
								shift: 2,
								area: ['600px', '500px'],
								shadeClose: true, //开启遮罩关闭
								content: $('#projectMember'),
							});
						}
					})
					return;

				}
			}
	}
</script>