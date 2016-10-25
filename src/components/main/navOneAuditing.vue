<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<!-- <a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; -->
			<a href="#!/navOneAuditAll">所有会员</a>&nbsp;>&nbsp;
			 待审核会员列表
		</div>
		<div class="ptb20">
			<div class="col-md-2 pr20">
				<select name="" class="form-control" v-model="chooseType">
					<option value="">未审核会员</option>
					<option value="1">创业者</option>
					<option value="2">投资者</option>
				</select>
			</div>
			<div class="col-md-2">
				<div class="col-xs-10">
					<input type="text" class="form-control radius0" v-model="searchName" placeholder="请输入用户名或者昵称" />
				</div>
				<div class="col-xs-2">
					<a href="javascript:;" class="btn btn-success radius0" @click="searchAuthencation"><i class="glyphicon glyphicon-search"></i></a>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="">
			<table class="table table-bordered tableTitle">
				<thead>
					<tr>
						<th>用户名</th>
						<th>昵称</th>
						<th>提交时间</th>
						<th>申请类型</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="authodList.length!=0">
						<tr v-for="item in authodList">
							<td>
								<a href="#!/navOneAuditing/memberhandler/{{item.user_id}}">{{item.phone}}</a>
							</td>
							<td>{{item.nickname}}</td>
							<td class="light-grey">{{item.submit_time}}</td>
							<td class="light-grey">
								<span v-if="item.type==1">创业者</span>
								<span v-if="item.type==2">投资者</span>
							</td>
							<td>
								<span v-if="item.is_handler==0">审核通过</span>
								<span v-if="item.is_handler==1">未审核</span>
								<span v-if="item.is_handler==2">未通过</span>
							</td>
							<td>
								<a href="javascript:;" @click="lookDetail(item.s_id)">审核</a>
							</td>
						</tr>
					</template>
<template v-else>
						<tr>
							<td colspan="6">暂无数据</td>
						</tr>
					</template>
</tbody>
</table>
<div id="authenPage"></div>
</div>
</div>
<div id="auditMember" style="display: none;">
	<audit-member :list='list'></audit-member>
</div>
</template>
<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
	} from '../../commonJs/commom';
	import {
		QUERY_HENDLER_URL,
		SEARCHMENBER_URL
	} from '../../api/config';
	import auditMember from './auditMember'
	export default {
		data() {
			return {
				chooseType: '',
				searchName: '',
				authodList: [],
				list: '' || {},
			}
		},
		ready() {
			this.getAuthenctionUserInfo(1);
		},
		vuex: {
			getters: {

			}
		},
		components: {
			auditMember

		},
		methods: {
			// 按条件搜索
			searchAuthencation() {
				this.getAuthenctionUserInfo(1);
			},
			//查询审核列表
			getAuthenctionUserInfo: function(pageNum) {
				var _this = this;
				pageNum = pageNum ? pageNum : 1;
				var pageSize = 10;
				var params = 'page=' + pageNum + '&pageSize=' + pageSize + '&type=' + this.chooseType + '&name=' + this.searchName;
				console.log(params);
				fethAsync(SEARCHMENBER_URL, params, res => {
					if (res.success) {
						var result = res.result;
						_this.authodList = result.pageList;

						$("#authenPage").pagination({
							items: parseInt(result.count), //总的条数:int类型
							currentPage: result.page, //页数
							itemsOnPage: pageSize, //每页显示几条
							cssStyle: 'light-theme',
							selectOnClick: true,
							hrefTextPrefix: '',
							onPageClick: function(pageNum) {
								_this.getAuthenctionUserInfo(pageNum);
							}
						});

					} else {
						tipTools(res.msg);
					}
				})
			},
			lookDetail(sid) {
				fethAsync(QUERY_HENDLER_URL, 's_id=' + sid, res => {
					if (res.success) {
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
		}
	}
</script>
