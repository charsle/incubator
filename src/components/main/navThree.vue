<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; 路演列表
		</div>
		<div class="ptb20">
			<div class="col-md-6 pr20">
				<a href="#!/navThree/addShow/888" class="btn btn-default">
					<i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;新增
				</a>
				<a href="javascript:;" class="btn btn-default" @click="deleteListItem">
					<i class="glyphicon glyphicon-trash"></i>&nbsp;&nbsp;删除
				</a>
			</div>
			<div class="col-md-4 pr20">
				<select name="" class="form-control" v-model="showStatus">
					<option value="">发布状态</option>
					<option value="1">已发布</option>
					<option value="0">未发布</option>
				</select>
			</div>
			<div class="col-md-2">
				<div class="col-xs-10">
					<input type="text" class="form-control radius0" v-model="searchName" placeholder="请输入标题" />
				</div>
				<div class="col-xs-2">
					<a href="javascript:;" class="btn btn-success radius0" @click="searchShow"><i class="glyphicon glyphicon-search"></i></a>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="">
			<table class="table table-bordered tableTitle">
				<thead>
					<tr>
						<th><input type="checkbox" v-model="allChecked" /></th>
						<th>标题</th>
						<th>主办方</th>
						<th>路演时间</th>
						<th>路演状态</th>
						<th>创业者</th>
						<th>投资人</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="showList.length!=0">
						<tr v-for="item in showList">
							<td><input type="checkbox" v-model="checkedNames" :value="item.s_id" /></td>
							<td>{{item.title}}</td>
							<td class="light-grey">{{item.organization}}</td>
							<td class="light-grey">{{item.show_time}}</td>
							<td class="light-grey">{{item.status==1?'已发布':'未发布'}}</td>
							<td class="light-grey">{{item.cNum}}</td>
							<td class="light-grey">{{item.tNum}}</td>
							<td>
								<a href="#!/navThree/addShow/{{item.s_id}}" v-if="item.status!=1" @click="updateChangeFile(item)">修改</a>
							</td>
						</tr>
					</template>
<template v-else>
						<tr>
							<td colspan="8">暂无数据</td>
						</tr>
					</template>
</tbody>
</table>
<div id="showPages"></div>
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
		QUERY_SHOW_LIST_URL,
		DELETE_POINT_LIST_UTL
	} from '../../api/config';

	export default {
		data() {
			return {
				showStatus: '',
				searchName: '',
				showList: [],
				checkedNames: []
			}
		},
		ready() {
			this.queryShowList(1);
		},

		computed: {
			// 全选
			allChecked: {
				get: function() {
					return this.checkedCount == this.showList.length;
				},
				set: function(value) {
					if (value) {
						this.checkedNames = this.showList.map(function(item) {
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
			updateChangeFile(item) {
				sessionStorage.setItem('userID', item.user_id);
			},
			deleteListItem() {
				var _this = this;
				layer.confirm('执行此操作将删除路演列表，并且不可恢复。您确定要这样做吗?', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						fethAsync(DELETE_POINT_LIST_UTL, 's_id=' + _this.checkedNames, res => {
							if (res.success) {
								_this.queryShowList(1);
								layer.closeAll();
							}
						})

					})
			},
			searchShow() {
				this.queryShowList(1);
			},
			queryShowList(pageNum) {
				var _this = this;
				pageNum = pageNum ? pageNum : 1;
				var pageSize = 10;
				var params = 'page=' + pageNum + '&pageSize=' + pageSize + '&title=' + this.searchName + '&status=' + this.showStatus;
				fethAsync(QUERY_SHOW_LIST_URL, params, res => {
					if (res.success) {
						var result = res.result;
						_this.showList = result.pageList;

						$("#showPages").pagination({
							items: parseInt(result.nums), //总的条数:int类型
							currentPage: result.page, //页数
							itemsOnPage: pageSize, //每页显示几条
							cssStyle: 'light-theme',
							selectOnClick: true,
							hrefTextPrefix: '',
							onPageClick: function(pageNum) {
								_this.queryShowList(pageNum);
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
