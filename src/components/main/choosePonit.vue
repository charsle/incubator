<template>
	<div class="p10">
		<div v-show="listid==''">
			<div v-show="isStep1">
				<div class="contentHead">
					<span class="inlineblock mt5">第一步：选择视频 </span>
					<a href="javascript:;" class="btn btn-primary fr btn-sm" @click="cancelFuck" style="width: 100px;margin-left:10px;">取消</a>
					<a href="javascript:;" class="btn btn-primary fr btn-sm" @click="chooseStep" style="width: 100px;">下一步</a>&nbsp;&nbsp;
					<div class="clearfix"></div>
				</div>

				<div class="ptb20">

					<div class="col-md-3 pr20">
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

					<div class="col-md-8">
						<div class="col-xs-10">
							<input type="text" class="form-control radius0" v-model="videoName" placeholder="请输入标题" />
						</div>
						<div class="col-xs-2">
							<a href="javascript:;" class="btn btn-success radius0" @click="searchVideo"><i class="glyphicon glyphicon-search"></i></a>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="row">
					<table class="table table-bordered tableTitle">
						<thead>
							<tr>
								<th width="3%"></th>
								<th width="30%">标题</th>
								<th>所属类别</th>
								<th>发布时间</th>
								<th>浏览次数</th>
								<th>状态</th>

							</tr>
						</thead>
						<tbody>
							<template v-if="vedioList.length!=0">
								<tr v-for="item in vedioList">
									<td><input type="radio" :value="item.s_id" v-model="checkedNames" /></td>
									<td>{{item.title}}</td>
									<td class="light-grey">{{item.type}}</td>
									<td class="light-grey">{{item.release_time}}</td>
									<td class="light-grey">{{item.browse_count}}</td>
									<td class="light-grey">{{item.status==0?'正常':'禁用'}}</td>

								</tr>
							</template>
<template v-else>
								<tr>
									<td colspan="6">暂无数据</td>
								</tr>
							</template>
</tbody>
</table>

</div>
</div>
<div id="vedioPages"></div>
</div>
<div v-else>
	<!--<div v-show="isStep2" >-->
	<div class="contentHead">
		<span class="inlineblock mt5">第二步：选择幻灯图片 </span>
		<a href="javascript:;" class="btn btn-primary fr btn-sm" @click="cancelFuck" style="width: 100px;">取消</a>&nbsp;&nbsp;
		<a href="javascript:;" class="btn btn-primary fr btn-sm" style="width: 100px;margin-right: 10px;" @click="saveAddPoint">确定</a>&nbsp;&nbsp;

		<div class="clearfix"></div>
	</div>
	<div class="addVideo mt20">
		<input type="file" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif" v-model="uploadValue" @change="uploadPonit" />
		<p v-if="pointUrl!=''">
			<img :src="pointUrl" width="150px" />
		</p>
	</div>
	<!--</div>-->
</div>
</div>

</template>

<script type="text/javascript">
	import {
		tipTools,
		fethAsync

	} from '../../commonJs/commom';
	import {
		QUERY_VIDEO_LIST_URL,
		WEB_ADD_POINT_PROJECT
	} from '../../api/config';
	import {
		uploadAll
	} from '../../assets/js/upload'
	export default {
		props: ['listtype', 'listid'],
		data() {
			return {
				videoTyp: '',
				videoName: '',
				videoStatus: '',
				vedioList: [],
				isStep1: true,
				isStep2: false,
				checkedNames: '',
				pointUrl: '',
				uploadValue: ''
			}

		},
		computed: {
			isShow() {

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
		methods: {
			chooseStep() {
				if (this.checkedNames == '') {
					tipTools('请选择视频类别');
					return;
				} else {
					this.isStep1 = false;
					this.isStep2 = true;
					this.listid = this.checkedNames
				}
			},
			chooseStep2() {
				this.step1 = true;
			},
			searchVideo() {
				this.queryVideoList(1);
			},
			watch: {
				listid: {
					handler() {
						if (this.listid == '') {
							this.queryVideoList(1);
						}

					}
				}
			},

			//查询列表
			queryVideoList(pageNum) {
				var _this = this;
				pageNum = pageNum ? pageNum : 1;
				var pageSize = 10;
				var params = 'page=' + pageNum + '&pageSize=' + pageSize + '&type=' + this.videoTyp + '&title=' + this.videoName + '&status=' + this.videoStatus;
				fethAsync(QUERY_VIDEO_LIST_URL, params, res => {
					if (res.success) {
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
			uploadPonit(e) {
				var _this = this;
				var fileInfo = e.target.files[0];

				uploadAll(1, fileInfo, '', '', function(d) {
					_this.pointUrl = d.data.url;
				})
			},
			cancelFuck() {
				if (this.listtype == 1) {
					this.isStep1 = true
					this.isStep2 = false
					this.listid = ''
				}
				this.videoTyp = ''
				this.videoName = ''
				this.videoStatus = ''

				this.checkedNames = ''
				this.pointUrl = ''
				this.uploadValue = ''

				layer.closeAll();
				console.log(this.isStep1)
			},

			saveAddPoint() {
				var params = '';

				if (this.pointUrl == '') {
					tipTools('请上传幻灯片图片');
					return;
				}

				if (this.listid == '') {
					params = 's_id=' + this.checkedNames + '&img_url=' + this.pointUrl;

				} else {
					params = 's_id=' + this.listid + '&img_url=' + this.pointUrl
				}

				fethAsync(WEB_ADD_POINT_PROJECT, params, res => {
					if (res.success) {
						var result = res.result;
						if (this.listtype == 1) {
							result.addItem = 1;
							this.cancelFuck();
							this.listid = ''
						}
						this.$store.dispatch('WEB_ADD_POINT_PROJECT', res.result);

					}
				})
			}

		}
	}
</script>
