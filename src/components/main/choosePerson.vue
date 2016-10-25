<template>
	<div class="p10">

		<div class="ptb20">
			<div class="col-md-4 pr20">
				<a href="javascript:;" class="btn btn-default" @click="joinProject(1)">
					<i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;加入
				</a>

			</div>
			<!--<div class="col-md-8">
				<div class="col-xs-10">
					<input type="text" class="form-control radius0" v-model="videoName" placeholder="请输入用户名" />
				</div>
				<div class="col-xs-2">
					<a href="javascript:;" class="btn btn-success radius0" @click="searchVideo"><i class="glyphicon glyphicon-search"></i></a>
				</div>
			</div>-->
			<div class="clearfix"></div>
		</div>
		<!--{{checkedNames | json}}-->
		<div class="row">
			<table class="table table-bordered tableTitle">
				<thead>
					<tr>
						<th width="3%"><input type="checkbox" v-model="allChecked" /></th>
						<th>姓名</th>
						<th>邮箱</th>
						<!--<th>状态</th>-->
					</tr>
				</thead>
				<tbody>
					<template v-if="vedioList.length!=0">
						<tr v-for="item in vedioList">
							<td><input type="checkbox" :value="item" name="checkName" v-model="checkedNames" /></td>
							<td class="light-grey">{{item.name}}</td>
							<td class="light-grey">{{item.email}}</td>
							<!--<td class="light-grey">{{item.status==0?'正常':'禁用'}}</td>-->
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

</template>

<script type="text/javascript">
	import {
		tipTools,
	} from '../../commonJs/commom';
	export default {
		props: ['vedioList'],
		data() {
			return {
				checkedNames: []
			}
		},
		vuex: {
			getters: {
				choosePersonItem(state) {
					return state.choosePersonItem;
				}
			}
		},
		watch: {
			choosePersonItem: {
				handler() {

					this.checkedNames=this.choosePersonItem.map(function(item) {
						console.log(JSON.stringify(item))

						return item;
					})
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
							return item;
						})
					} else {
						this.checkedNames = [];
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
			joinProject() {
				this.$store.dispatch('ADD_CHOOSE_PARSON', this.checkedNames);
				this.checkedNames = [];
				layer.closeAll();
			},

		}
	}
</script>