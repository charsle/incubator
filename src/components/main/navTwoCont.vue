<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; 所有视频
		</div>
		<div class="ptb20">
			<div class="col-md-6 pr20">
				<a href="javascript:;" class="btn btn-default" @click="addVideo(1)">
					<i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;新增
				</a>
				<a href="javascript:;" class="btn btn-default" @click="deleteVideo">
					<i class="glyphicon glyphicon-trash"></i>&nbsp;&nbsp;删除
				</a>
			</div>
			<div class="col-md-2 pr20">
				<select name="" class="form-control" v-model="videoTyp">

					<option value="">视频类别</option>
					<option value="电子商务">电子商务</option>
					<option value="社交媒体">社交媒体</option>
					<option value="医疗健康">医疗健康</option>
					<option value="教育培训">教育培训</option>
					<option value="智能硬件">智能硬件</option>
					<option value="金融">金融</option>
					<option value="企业服务">企业服务</option>
					<option value="交通物流">交通物流</option>
					<option value="户外旅游">户外旅游</option>
					<option value="其他">其他</option>
				</select>
			</div>
			<div class="col-md-2 pr20">
				<select name="" class="form-control" v-model="videoStatus">

					<option value="">视频状态</option>
					<option value="0">正常</option>
					<option value="1">禁用</option>
				</select>
			</div>
			<div class="col-md-2">
				<div class="col-xs-10">
					<input type="text" class="form-control radius0" v-model="videoName" placeholder="请输入标题" />
				</div>
				<div class="col-xs-2">
					<a href="javascript:;" class="btn btn-success radius0" @click="searchVideo"><i class="glyphicon glyphicon-search"></i></a>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!--{{getAddVideoItem | json}}-->
		<div class="row">
			<table class="table table-bordered tableTitle">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" v-model="allChecked" /></th>
						<th width="30%">标题</th>
						<th>所属类别</th>
						<th>发布时间</th>
						<th>状态</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="vedioList.length!=0">
						<tr v-for="item in vedioList">
							<td><input type="checkbox" :value="item.s_id" v-model="checkedNames" /></td>
							<td>{{item.title}}</td>
							<td class="light-grey">{{item.type}}</td>
							<td class="light-grey">{{item.release_time}}</td>

							<td class="light-grey">{{item.status==0?'正常':'禁用'}}</td>
							<td>
								<a href="javascript:;" @click="updateVideo(item.s_id)">修改</a>
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
			<div id="vedioPages"></div>
		</div>
	</div>
	<div id="addVideoTemplate" style="display:none">
		<video-info :lists='videoItem'></video-info>
	</div>
</template>

<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
		getCookie
	} from '../../commonJs/commom';
	import {
		QUERY_VIDEO_LIST_URL,
		QUERY_BY_VIDEO_INFO_URL,
		DELETE_VIDEO_LIST_URL
	} from '../../api/config';
	import videoInfo from './videoInfo'
	const infoList = {
		"s_id": "",
		"title": "",
		"content": "",
		"url": "",
		"status": "",
		"release_time": "",
		"type": "",
		"duration": "",
		"browse_count": 0,
		"img_url": '',
		"is_deline": ""
	}
	export default {
		data() {
				return {
					videoTyp: '',
					videoName: '',
					videoStatus: '',
					vedioList: [],
					videoItem: infoList,
					checkedNames: []
				}

			},
			ready() {
				this.queryVideoList(1);
			},
			vuex: {
				getters: {
					getAddVideoItem(state) {
						return state.addOrUpdateVideoItem;
					}
				}
			},
			computed: {
				// 全选
				allChecked: {
					get: function() {
						return this.checkedCount == this.vedioList.length;
					},
					set: function(value) {
						if(value) {
							this.checkedNames = this.vedioList.map(function(item) {
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
			watch: {
				getAddVideoItem: {
					handler() {
						var newList = this.getAddVideoItem;
						if(newList.hasOwnProperty('newAddItem')) {
							this.vedioList.unshift(newList);
						} else {
							for(let item of this.vedioList) {
								if(item.s_id == newList.s_id) {
									item.title = newList.title;
									item.type = newList.type;
									item.release_time = newList.release_time;
									item.status = newList.status;
								}
							}
						}
					}
				}
			},
			components: {
				videoInfo
			},
			methods: {
				searchVideo() {
					this.queryVideoList(1);
				},
				updateVideo(sid) {

					fethAsync(QUERY_BY_VIDEO_INFO_URL, 's_id=' + sid, res => {
						if(res.success) {
							this.videoItem = res.result;
							this.addVideo();
						}
					});
				},
				//查询列表
				queryVideoList(pageNum) {
					var _this = this;
					pageNum = pageNum ? pageNum : 1;
					var pageSize = 10;
					var params = 'page=' + pageNum + '&pageSize=' + pageSize + '&type=' + this.videoTyp + '&title=' + this.videoName + '&status=' + this.videoStatus;
					fethAsync(QUERY_VIDEO_LIST_URL, params, res => {
						if(res.success) {
							var result = res.result;
							_this.vedioList = result.pageList;

							$("#vedioPages").pagination({
								items: parseInt(result.count), //总的条数:int类型
								currentPage: result.page, //页数
								itemsOnPage: pageSize, //每页显示几条
								cssStyle: 'light-theme',
								selectOnClick: true,
								hrefTextPrefix: '',
								onPageClick: function(pageNum) {
									_this.queryVideoList(pageNum);
								}
							});

						} else {
							tipTools(res.msg);
						}
					})

				},
				//添加视频
				addVideo(type) {
					if(type == 1) {
						this.videoItem = infoList;
					}
					layer.open({
						type: 1,
						//						closeBtn: 0, //不显示关闭按钮
						shift: 2,
						area: ['800px', '700px'],
						//						shadeClose: true, //开启遮罩关闭
						content: $('#addVideoTemplate'),
					});
				},
				deleteVideo() {
					var _this = this;
					layer.confirm('执行此操作将删除视频，并且不可恢复。您确定要这样做吗?', {
							btn: ['确定', '取消'] //按钮
						},
						function() {
							var params = 's_id=' + _this.checkedNames;
							fethAsync(DELETE_VIDEO_LIST_URL, params, res => {
								if(res.success) {
									_this.queryVideoList(1)
									layer.closeAll();
								}
							});

						})

				}
			}
	}
</script>