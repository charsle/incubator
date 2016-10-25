<template>
	<div class="p10">

		<div class="w100">
			<h5 class="detaileTitle">视频信息</h5>
			<div class="row">
				<div class="col-xs-1">
					所属类别
				</div>
				<div class="col-xs-11">
					<select name="" class="form-control" v-model="addvideoType">

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
			</div>
			<div class="row mt10">
				<div class="col-xs-1">
					显示状态
				</div>
				<div class="col-xs-11">

					<input type="radio" name="state" value="0" v-model="picked"> 正常 &nbsp;&nbsp;

					<input type="radio" name="state" value="1" v-model="picked"> 禁用

				</div>
			</div>
			<div class="row mt10">
				<div class="col-xs-1">
					视频名称
				</div>
				<div class="col-xs-11">
					<input type="text" class="form-control" placeholder="请输入视频名称" :value="lists.title" v-model="videoTitle" />
				</div>
			</div>
			<div class="row mt10">
				<div class="col-xs-1">
					视频网址
				</div>
				<div class="col-xs-11">
					<input type="text" class="form-control" placeholder="请输入视频网址" :value="lists.url" v-model="videoUrl" />
				</div>
			</div>
			<div class="row mt10">
				<div class="col-xs-1">
					视频时长
				</div>
				<div class="col-xs-11">
					<input type="text" class="form-control" placeholder="请输入视频时长" :value="lists.duration" v-model="videoDuration" />
				</div>

			</div>
			<div class="row m10">
				<div class="col-xs-1">
					浏览次数:
				</div>
				<div class="col-xs-11">
					<input type="number" class="form-control" placeholder="浏览次数" :value="lists.browse_count" class="tc" v-model="videoCount" />
				</div>
			</div>
			<div class="row mt10">
				<div class="col-xs-1">
					视频图片
				</div>
				<div class="col-xs-11">
					<div class="form-group row">
						<input type="file" id="exampleInputFile" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif" @change="updateFile">
					</div>
					<div class="row" v-if="lists.img_url!=''">
						<img :src="lists.img_url" width="100" />
					</div>
				</div>
			</div>
			<div class="row mt10">
				<div class="row">
					视频简介
				</div>
				<div class="row mt10">
					<textarea name="" placeholder="请输入视频简介" :value="lists.content" rows="5" v-model="videoContent" class="form-control"></textarea>
				</div>
			</div>
		</div>
		<div class="text-right mt10">
			<button class="btn btn-primary" @click="saveVideo">保存</button>
			<button class="btn btn-primary" @click="cancelVideo">取消</button>
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
		INSERT_OR_UPDATE_VIDEO_URL
	} from '../../api/config';

	import {
		uploadAll
	} from '../../assets/js/upload'
	export default {
		props: ['lists'],
		data() {
			return {
				addvideoType: '电子商务',
				picked: 0,
				videoTitle: '',
				videoUrl: '',
				videoDuration: '',
				videoCount: '',
				videoContent: '',
				imageUrl: '',
				sid: ''
			}

		},
	
		methods: {
			updateFile(e) {
				var _this=this;
				var fileInfo = e.target.files[0];
				
				uploadAll(1, fileInfo, '', '', function(d) {
					_this.lists.img_url=d.data.url;
				})
			},
			saveVideo() {
				var params = 'title=' + this.videoTitle + '&url=' + this.videoUrl + '&status=' + this.picked + '&type=' + this.addvideoType + '&content=' + this.videoContent +
					'&duration=' + this.videoDuration + '&browse_count=' + this.videoCount + '&img_url=' + this.lists.img_url + '&s_id=' + this.lists.s_id;
				fethAsync(INSERT_OR_UPDATE_VIDEO_URL, params, res => {
					if(res.success) {
						var result = res.result;
						if(this.lists.s_id == '') {
							result.newAddItem = 1;
						}
						this.$store.dispatch('ADD_OR_UPDATE_VIDEO_ITEM', result);
						layer.closeAll();
					}
//					console.log(res)

				})
			},
			cancelVideo(){
				this.addvideoType= '电子商务';
				this.picked=0;
				this.videoTitle='';
				this.videoUrl='';
				this.videoDuration= '';
				this.videoCount= '';
				this.videoContent= '';
				this.imageUrl='';
				this.sid= '';
				layer.closeAll();
			}
		}

	}
</script>