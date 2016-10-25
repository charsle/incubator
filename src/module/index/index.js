import Vue from 'vue'
import  'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import App from '../../components/index/App'
require('../../../static/lib/layer/layer.min.js')
Vue.use(VueRouter);
Vue.config.debug = true;
var router = new VueRouter({
	//history:true
});

router.map({
	'/App': {
		component:App
	}
	
})
router.redirect({
	'*': '/App'
});
router.start(App, '#indexApp');