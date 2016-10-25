<template>
	<div class="film-warpper">
		<div class="row headerMain">
			<div class="col-xs-8 col-md-8">
				<img src="../../assets/Group-2.png" width="300" class="ml20 mt15" />
			</div>
			<div class="col-xs-4 col-md-4 tr pr20">
				<div class="row">
					欢迎您,管理员：{{userInfo.account}}
				</div>
				<div class="row mt10">
					<a href="#!/navFour">[修改密码]</a>&nbsp;&nbsp;|&nbsp;&nbsp;
					<a href="javascript:;" @click="exitSystem">[退出登录]</a>
				</div>
				<div class="row mt10">
					上传登录时间:{{userInfo.last_login_time}}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="film-slide-bar common col-xs-2">
				<ul>
					<li>
						<a>
							<i class="glyphicon glyphicon-chevron-up"></i>&nbsp;&nbsp;会员管理
						</a>
						<ul>
							<li>
								<a v-link="{path:'/navOneAuditing'}" href="javascript:;">审核会员</a>
							</li>
							<li>
								<a v-link="{path:'/navOneAuditAll'}" href="javascript:;">所有会员</a>
							</li>
						</ul>
					</li>
					<li>
						<a>
							<i class="glyphicon glyphicon-chevron-up"></i>&nbsp;&nbsp;视频管理
						</a>
						<ul>
							<li>
								<a v-link="{path:'/navTwoCont'}" href="javascript:;">内容列表</a>
							</li>
							<li>
								<a v-link="{path:'/navTwoPoint'}" href="javascript:;">幻灯列表</a>
							</li>
						</ul>
					</li>
					<li>
						<a>
							<i class="glyphicon glyphicon-chevron-up"></i>&nbsp;&nbsp;路演管理
						</a>
						<ul>
							<li>
								<a v-link="{path:'/navThree'}" href="javascript:;">内容管理</a>
							</li>
						</ul>
					</li>
					<li>
						<a v-link="{path:'/navFour'}">
							系统管理
						</a>
					</li>
				</ul>

			</div>
<!--{{userInfo | json}}-->
			<div class="film-slide-content common col-xs-10">
				<div id="icon-content">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<div class="footer">
			版权所有 重庆高略启达智慧城市有限公司 © Copyright 2016 by galo. All Rights Reserved.
		</div>
	</div>
</template>

<script type="text/javascript">
	import store from '../../vuex/store';
	import {
		fethAsync,
		tipTools,
		getCookie,
		delCookie
	} from '../../commonJs/commom';
	import {
		CANCLE_URL
	} from '../../api/config';
	export default {
		data: function() {
			return {
				userInfo: JSON.parse(getCookie('basicInfo'))
			}
		},
		ready() {

			console.log(this.allInfo);
			setTimeout(() => {
				this.doResize();
			}, 60)
			$(window).resize(() => {
				this.doResize();
			})
		},
		store,
		methods: {
			doResize() {
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var iconContent = document.getElementById("icon-content");
				iconContent.style.height = (clientHeight - 150) + 'px';
				iconContent.style.overflow = 'auto';
			},
			exitSystem() {
				fethAsync(CANCLE_URL, '', res => {
					if (res.success) {
						location.href = 'index.html';
						delCookie('basicInfo');
					} else {
						tipTools(res.msg);
					}
				})

			},
		}
	}
</script>
