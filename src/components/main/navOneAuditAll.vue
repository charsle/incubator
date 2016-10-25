<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; 所有会员信息
		</div>
		<div class="ptb20">
			<div class="col-md-1 pr20">
				<a href="javascript:;" class="btn btn-default" @click="deleteUserList">
					<i class="glyphicon glyphicon-trash"></i>&nbsp;&nbsp;删除
				</a>
			</div>
			<div class="col-md-2 pr20">
				<select name="" class="form-control" v-model="typeSelected" id="stateType" @change="showType">

					<option value="0">注册用户</option>
					<option value="1">创业者</option>
					<option value="2">投资人</option>
				</select>
			</div>
			<div class="col-md-2 pr20">
				<select name="" class="form-control" v-model="stateSelect" id="stateTP">
					<option v-for="t in typeList" :value="t.id">{{t.name}}</option>
				</select>
			</div>
			<div class="col-md-2">
				<div class="col-xs-10">
					<input type="text" class="form-control radius0" v-model="nameUser" placeholder="请输入用户名或者昵称" />
				</div>
				<div class="col-xs-2">
					<a href="javascript:;" class="btn btn-success radius0" @click="searchAllList"><i class="glyphicon glyphicon-search"></i></a>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="">
			<table class="table table-bordered tableTitle">
				<thead>
					<tr>
						<th><input type="checkbox" v-model="allChecked" /></th>
						<th>用户名</th>
						<th>昵称</th>
						<th>提交时间</th>
						<th>申请类型</th>
						<th>状态</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="userList.length!=0">
						<tr v-for="item in userList">
							<td width="3%"><input type="checkbox" v-model="checkedNames" :value="item.s_id" /></td>
							<td>
								<a href="#!/navOneAuditAll/membership/{{item.s_id}}">{{item.phone}}</a>
							</td>
							<td>{{item.nickname}}</td>
							<td class="light-grey">{{item.create_time}}</td>
							<td class="light-grey">
								<i v-if="item.usertype==0">注册用户</i>
								<i v-if="item.usertype==1">创业者</i>
								<i v-if="item.usertype==2">投资者</i>
							</td>
							<td>
								<i v-if="item.is_handler==0">审核通过</i>
								<i v-if="item.is_handler==1">未审核</i>
								<i v-if="item.is_handler==2">未通过</i>
								<i v-if="item.is_handler==null">正常</i>
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
			<div id="pages"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
	} from '../../commonJs/commom';
	import {
		ALLUSER_URL,
		DELETE_USER_URL
	} from '../../api/config';

	var typeList = [{
		id: 3,
		name: '正常'
	}, {
		id: 1,
		name: '待审核'
	}, {
		id: 2,
		name: '未通过'
	}]
	export default {
		data: function() {
			return {
				userInfo: '',
				typeSelected: '0',
				nameUser: '',
				stateSelect: '3',
				checkedNames: [],
				type: '',
				status: '',
				userList: [],
				typeList: typeList
			}
		},
		ready() {
			this.getAllUserInfo();
		},
		computed: {
			// 全选
			allChecked: {
				get: function() {
					return this.checkedCount == this.userList.length;
				},
				set: function(value) {
					if(value) {
						this.checkedNames = this.userList.map(function(item) {
							return item.s_id;
						})
					} else {
						this.checkedNames = []
					}
				}
			},
			checkedCount: {
				get: function() {
					return this.checkedNames.length;
				}
			}
		},
		methods: {
			showType() {
				if(this.typeSelected == 1 || this.typeSelected == 2) {
					this.$set('typeList', [{
						id: 0,
						name: '通过'
					}])
					this.stateSelect = 0;
				} else {
					this.$set('typeList', [{
						id: 3,
						name: '正常'
					}, {
						id: 1,
						name: '待审核'
					}, {
						id: 2,
						name: '未通过'
					}])
					this.stateSelect = 3;
				}

			},
			//删除
			deleteUserList() {
				var _this = this;
				var params = 's_id=' + this.checkedNames;
				layer.confirm('执行此操作将删除会员，并且不可恢复。您确定要这样做吗?', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						fethAsync(DELETE_USER_URL, params, res => {
							if(res.success) {
								_this.getAllUserInfo(1)
								layer.closeAll();
							}
						});

					})

			},
			searchAllList() {
				this.getAllUserInfo(1)
			},
			getAllUserInfo: function(pageNum) {
				var _this = this;
				pageNum = pageNum ? pageNum : 1;
				var pageSize = 20;
				var params = 'page=' + pageNum + '&pageSize=' + pageSize + '&type=' + this.typeSelected + '&name=' + this.nameUser + '&is_handler=' + this.stateSelect;
				fethAsync(ALLUSER_URL, params, res => {
					if(res.success) {
						var result = res.result;
						_this.userList = result.pageList;

						$("#pages").pagination({
							items: parseInt(result.count), //总的条数:int类型
							currentPage: result.page, //页数
							itemsOnPage: pageSize, //每页显示几条
							cssStyle: 'light-theme',
							selectOnClick: true,
							hrefTextPrefix: '',
							onPageClick: function(pageNum) {
								_this.getAllUserInfo(pageNum);
							}
						});

					} else {
						tipTools(res.msg);
					}
				})
			},

		}
	}
</script>