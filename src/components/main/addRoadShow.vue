<template>
	<div class="p10">
		<div v-show="showStep1">
			<div class="w100">
				<!--{{userId | json}}-->
				<h5 class="detaileTitle">第一步：路演基本信息</h5>
				<div class="row">
					<div class="col-xs-1">
						路演主题
					</div>
					<div class="col-xs-11">
						<input type="text" class="form-control" :value="initData.show.title" v-model="showTitle" placeholder="请输入路演主题" />
					</div>
				</div>
				<div class="row mt10">
					<div class="col-xs-6">
						<div class="col-xs-2">
							组织方:
						</div>
						<div class="col-xs-9">
							<input type="text" class="form-control" :value="initData.show.organization" v-model="showOrgan" placeholder="请输入组织方">
						</div>
					</div>
					<div class="col-xs-6">
						<div class="col-xs-2">
							路演时间:
						</div>
						<div class="col-xs-10">
							<datetime :readonly="true" :value="initData.show.show_time!=''?initData.show.show_time:'请选择路演时间'" format="YYYY-MM-DD HH:hh:ss"></datetime>
						</div>
					</div>

				</div>
				<div class="row mt10">
					<div class="col-xs-1">
						直播网址
					</div>
					<div class="col-xs-11">
						<input type="text" class="form-control" :value="initData.show.website" v-model="showWebsite" placeholder="请输入直播网址" />
					</div>
				</div>
				<div class="row mt10">
					<div class="col-xs-1">
						路演封面
					</div>
					<div class="col-xs-11">
						<div class="form-group row">
							<input type="file" id="exampleInputFile" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif" @change="updateFile($event,1)">
						</div>
						<div class="row" v-if="initData.show.cover_url!=''">
							<img :src="initData.show.cover_url" width="100" />
						</div>
					</div>
				</div>
				<div class="row mt10">
					<div class="col-xs-1">
						列表小图
					</div>
					<div class="col-xs-11">
						<div class="form-group row">
							<input type="file" id="exampleInputFile" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif" @change="updateFile($event,2)">
						</div>
						<div class="row" v-if="initData.show.list_url!=''">
							<img :src="initData.show.list_url" width="100" />
						</div>
					</div>
				</div>

				<div class="row mt10">
					<div class="row">
						路演简介:
					</div>
					<div class="row mt10">
						<textarea name="" placeholder="请输入视频简介" :value="initData.show.remark" rows="5" v-model="showContent" class="form-control"></textarea>
					</div>
				</div>
			</div>
			<div class="text-right mt10">
				<button class="btn btn-primary" @click="chooseStepNext">下一步</button>
			</div>
		</div>
		<!--*****************************************************************************************-->
		<div v-show="showStep2">
			<div class="w100">
				<h5 class="detaileTitle">第二步：操作路演者</h5>
			</div>
			<!--{{initData.cList | json}}-->
			<div class="cyez">
				<div>
					<a href="javascript:;" class="btn btn-primary" @click="showChooseModel(1)">创业者</a>

				</div>
				<table class="table table-bordered tableTitle">
					<thead>
						<tr>
							<!--<td width="3%"><input type="checkbox" name="" id="" value="" /></td>-->
							<td>用户名</td>
							<td>路演主题</td>
							<td>序号</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody id="cListTr">
						<template v-if="initData.cList.length!=0">
							<tr v-for="item in initData.cList">
								<!--<td><input type="checkbox" name="" id="" value="" /></td>-->
								<td>{{item.name}}</td>

								<td><input type="text" :value="item.title" /></td>
								<td><input type="text" :value="item.sort" /></td>
								<td>
									<a href="javascript:;" class="btn btn-default btn-xs" @click="deleteItem(1,item)">
										<i class="glyphicon glyphicon-trash"></i> &nbsp;移除
									</a>
								</td>
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
<div class="cyez">
	<div>
		<a href="javascript:;" class="btn btn-primary" @click="showChooseModel(2)">投资者</a>

	</div>
	<table class="table table-bordered tableTitle mt2">
		<thead>
			<tr>
				<!--<td width="3%"><input type="checkbox" name="" id="" value="" /></td>-->
				<td>用户名</td>
				<td>序号</td>
				<td>操作</td>
			</tr>
		</thead>
		<tbody id="tListTr">
			<template v-if="initData.tList.length!=0">
							<tr v-for="item in initData.tList">
								<!--<td><input type="checkbox" name="" id="" value="" /></td>-->
								<td>{{item.name}}</td>
								<td><input type="text" :value="item.sort" /></td>
								<td>
									<a href="javascript:;" class="btn btn-default" @click="deleteItem(2,item)">
										<i class="glyphicon glyphicon-trash"></i> &nbsp;移除
									</a>
								</td>
							</tr>
						</template>
			<template v-else>
							<tr>
								<td colspan="4">暂无数据</td>
							</tr>
						</template>
		</tbody>
	</table>

</div>
<div class="text-right mt10">
	<button class="btn btn-primary" @click="chooseStepPrav">上一步</button>
	<button class="btn btn-primary" @click="savePointAndNext">下一步</button>
</div>
</div>
<div v-show="showStep3">
	<div class="w100">
		<h5 class="detaileTitle">第三步：发送路演信息预览</h5>
	</div>
	<div class="row">
		<p>路演主题：{{initData.show.title}}</p>
		<p>主办方：{{initData.show.organization}}</p>
		<p>路演时间：{{initData.show.show_time}}</p>
		<p>创业者名单：
			<p>
				<table class="table table-bordered tableTitle mt2">
					<thead>
						<tr>
							<td>姓名</td>
							<td>主题</td>
							<td>序号</td>
						</tr>
					</thead>
					<tbody>
						<template v-if="initData.cList.length!=0">
									<tr v-for="item in initData.cList">
										<td>{{item.name}}</td>
										<td>{{item.title}}</td>
										<td>{{item.sort}}</td>
									</tr>
								</template>
						<template v-else>
									<tr>
										<td colspan="4">暂无数据</td>
									</tr>
								</template>
					</tbody>
				</table>
			</p>
		</p>
		<p>投资人名单：
			<p>
				<table class="table table-bordered tableTitle mt2">
					<thead>
						<tr>
							<td>姓名</td>

							<td>序号</td>
						</tr>
					</thead>
					<tbody>
						<template v-if="initData.tList.length!=0">
									<tr v-for="item in initData.tList">
										<td>{{item.name}}</td>

										<td>{{item.sort}}</td>
									</tr>
								</template>
						<template v-else>
									<tr>
										<td colspan="4">暂无数据</td>
									</tr>
								</template>
					</tbody>
				</table>

			</p>

		</p>
	</div>
	<div class="text-right mt10">
		<button class="btn btn-primary" @click="publishPoint">发布</button>
		<a href="#!/navThree" class="btn btn-default">返回列表</a>
	</div>
</div>
</div>
<div id="choosePersonTemplate" style="display: none;">
	<choose-person :vedio-list='showList' :choose-item="chooseItem"></choose-person>
</div>
</template>
<script type="text/javascript">
	import {
		tipTools,
		fethAsync,
		getCookie
	} from '../../commonJs/commom';
	import {
		EDIT_SHOW_LIST_URL,
		SELECT_SHOW_USER_URL,
		ADD_PONIT_UPDATE_URL,
		PUBLISH_POINT_URL
	} from '../../api/config';
	import datetime from 'vue-datetimepicker';
	import choosePerson from './choosePerson';

	import initData from '../../api/show';

	import {
		uploadAll
	} from '../../assets/js/upload'
	export default {
		//		props: ['lists'],
		data() {
			return {
				showStep1: true,
				showStep2: false,
				showStep3: false,
				initData: initData,
				showTitle: '',
				showOrgan: '',
				showWebsite: '',
				showContent: '',
				show_time: '',
				showList: [],
				typeShow: 0,
				chooseItem: [],
				sId: '',
				userId: JSON.parse(getCookie('basicInfo')).s_id
			}
		},
		route: {
			data: function(transition) {
				var id = transition.to.params.id;
				var userId = sessionStorage.getItem('userID');
				if (id != 888) {
					this.editShowList(id, userId);
				}
			}
		},
		events: {
			'changeDate': function(msg) {
				this.initData.show.show_time = msg
			}
		},
		components: {
			datetime,
			choosePerson
		},
		vuex: {
			getters: {
				getAddPointItem(state) {
					return state.addChoosePerson;
				}
			}
		},
		watch: {
			getAddPointItem: {
				handler() {
					var itemsList = this.getAddPointItem;
					for (let item of itemsList) {
						var obj = {};
						obj.s_id = '';
						obj.show_id = this.initData.show.s_id;
						obj.user_id = item.s_id;
						obj.name = item.name;
						obj.title = '';
						obj.type = this.typeShow;
						obj.sort = 0;
						if (this.typeShow == 1) {
							this.initData.cList.unshift(obj);
						} else {
							this.initData.tList.unshift(obj);
						}
					}

				}
			}
		},
		methods: {
			editShowList(sid, user_id) {
				console.log(sid, user_id)
				fethAsync(EDIT_SHOW_LIST_URL, 's_id=' + sid + '&userId=' + user_id, res => {
					if (res.success) {
						this.initData = res.result;
					}
				})
			},
			//发布
			publishPoint() {
				var _this = this;
				layer.confirm('您确定要执行发布操作，发布后将不能更改?', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						fethAsync(PUBLISH_POINT_URL, 's_id=' + _this.sId, res => {
							if (res.success) {
								location.href = "#!/navThree";
								layer.closeAll();
							}
						})

					})
			},
			chooseStepNext() {

				if (this.showTitle == '') {
					tipTools('请输入路演主题');
					return;
				}
				if (this.showOrgan == '') {
					tipTools('请输入组织方');
					return;
				}
				if (this.initData.show.show_time == '') {
					tipTools('请输入路演时间');
					return;
				}
				this.initData.show.title = this.showTitle;
				this.initData.show.organization = this.showOrgan;
				this.initData.show.website = this.showWebsite;
				this.initData.show.remark = this.showContent;
				this.initData.show.show_time = this.show_time;
				this.showStep1 = false
				this.showStep2 = true
			},
			chooseStepPrav() {
				this.showStep1 = true
				this.showStep2 = false
			},
			savePointAndNext() {
				var _this = this;
				var cListTr = $('#cListTr tr');
				var tListTr = $('#tListTr tr');
				var cList = this.initData.cList;
				var tList = this.initData.tList;
				this.initData.show.user_id = this.userId;
				for (let item of cList) {
					for (let i = 0; i < cListTr.length; i++) {
						item.title = $(cListTr[i]).find('td').eq(1).find('input').val();
						item.sort = $(cListTr[i]).find('td').eq(2).find('input').val();
					}
				}
				for (let item of tList) {
					for (let i = 0; i < tListTr.length; i++) {
						item.sort = $(tListTr[i]).find('td').eq(1).find('input').val();
					}
				}

				var list = JSON.stringify(this.initData);
				layer.confirm('请认真核对信息,下一步将进行发布操作', {
						btn: ['确定', '取消'] //按钮
					},
					function() {
						fethAsync(ADD_PONIT_UPDATE_URL, list, res => {
							if (res.success) {
								_this.sId = res.result;
								_this.showStep3 = true
								_this.showStep1 = false
								_this.showStep2 = false
								layer.closeAll()
							}
						});
					});

			},
			showChooseModel(index) {
				this.$store.dispatch('ADD_CHOOSE_PARSON', []);
				var params = '&type=' + index;
				this.typeShow = index;
				fethAsync(SELECT_SHOW_USER_URL, params, res => {
					if (res.success) {
						var result = res.result;
						this.showList = result;
						//this.$store.dispatch('CHOOSE_PARSON_ITEM', this.getAddPointItem);
						layer.open({
							type: 1,
							//								btn:['撤回','取消'],
							closeBtn: 0, //不显示关闭按钮
							shift: 2,
							area: ['600px', '500px'],
							//							shadeClose: true, //开启遮罩关闭
							content: $('#choosePersonTemplate'),
						});
					} else {
						tipTools(res.msg);
					}
				})

			},
			deleteItem(index, item) {
				if (index == 1) {
					this.initData.cList.$remove(item);
				} else {
					this.initData.tList.$remove(item);
				}
			},
			updateFile(e, index) {
				var _this = this;
				var fileInfo = e.target.files[0];

				uploadAll(1, fileInfo, '', '', function(d) {
					if (index == 1) {
						_this.initData.show.cover_url = d.data.url;

					} else {
						_this.initData.show.list_url = d.data.url;
					}

				})
			},

		}

	}
</script>
