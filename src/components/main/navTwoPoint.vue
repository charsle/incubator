<template>
	<div class="">
		<div class="contentHead">
			<i class="glyphicon glyphicon-home fs18"></i>&nbsp; 当前位置：
			<a href="#!/loginIn">系统后台管理</a> &nbsp;>&nbsp; 幻灯列表
		</div>
		<div class="w100">
			<h5 class="detaileTitle">幻灯设置</h5>
			<ul class="powerPointer">
				<li v-for="item in pointList">
					<!--<h5>{{item.title}}</h5>-->
					<div class="row tc">
						<img :src="item.img_url | getUrl" />
					</div>
					<p class="mt10 nowrap overflow text-center">{{item.title}}</p>
					<div class="row tc">
						<a href="javascript:;" class="btn btn-success btn-sm" @click="updatePointOrAddPonit(2,item.s_id)">更改</a>
						<a href="javascript:;" class="btn btn-default btn-sm" @click="deletePointItem(item)">删除</a>
					</div>
				</li>
				<li class="tc addVideo" @click="updatePointOrAddPonit(1,'')" v-if="pointList.length<4">
					<i class="glyphicon glyphicon-plus fs50 light-grey"></i>
				</li>
			</ul>
		</div>
	</div>
	<div id="addPonitTemplate" style="display: none;">
		<choose-point :listtype="listtype" :listid="listid"></choose-point>

	</div>
</template>

<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
	} from '../../commonJs/commom';
	import {
		QUERY_POINT_LIST_URL,
		DELETE_POINT_ITEM_URL
	} from '../../api/config';
	import choosePoint from './choosePonit'
	import {
		uploadAll
	} from '../../assets/js/upload'

	export default {
		data() {
			return {
				pointList: [],
				listtype: '',
				listid: ''
			}
		},
		ready() {
			this.queryPointList();
		},
		components: {
			choosePoint
		},
		vuex: {
			getters: {
				webAddPointProject(state) {
					return state.webAddPointProject;
				}
			}
		},
		watch: {
			webAddPointProject: {
				handler() {
					var itemList = this.webAddPointProject;
					if (itemList.hasOwnProperty('addItem')) {
						this.pointList.unshift(itemList);
					} else {
						for (let item of this.pointList) {
							if (itemList.s_id == item.s_id) {
								item.img_url = itemList.img_url;
							}
						}
					}
				}
			}
		},
		methods: {
			queryPointList() {
				fethAsync(QUERY_POINT_LIST_URL, '', res => {
					if (res.success) {
						this.pointList = res.result;
					} else {
						tipTools(res.msg)
					}

				})
			},

			updatePointOrAddPonit(index, sid) {

				this.listid = sid;
				this.listtype = index;
				console.log(sid)
				layer.open({
					type: 1,
					closeBtn: 0, //不显示关闭按钮
					shift: 2,
					area: ['800px', '700px'],
					//						shadeClose: true, //开启遮罩关闭
					content: $('#addPonitTemplate'),
				});
			},
			deletePointItem(item) {
				var _this = this;
				if (this.pointList.length > 1) {
					layer.confirm('执行此操作将删除幻灯片，并且不可恢复。您确定要这样做吗?', {
							btn: ['确定', '取消'] //按钮
						},
						function() {
							fethAsync(DELETE_POINT_ITEM_URL, 's_id=' + item.s_id, res => {
								if (res.success) {
									_this.pointList.$remove(item)
									layer.closeAll()
								} else {
									tipTools(res.msg)
								}
							})
						})
				} else {
					tipTools('必须至少保留1个幻灯。')
				}
			}
		},

	}
</script>
