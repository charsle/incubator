import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
require('../../../static/lib/layer/layer.min.js')
require('../../../static/lib/pages/jquery.simplePagination.js')
import VueRouter from 'vue-router'
import mainApp from '../../components/main/mainApp'
import loginIn from '../../components/main/loginIn'
import navOneAuditing from '../../components/main/navOneAuditing'
import navOneAuditAll from '../../components/main/navOneAuditAll'
import navTwoCont from '../../components/main/navTwoCont'
import navTwoPoint from '../../components/main/navTwoPoint'
import navThree from '../../components/main/navThree'
import navFour from '../../components/main/navFour'

import membership from '../../components/main/membership'
//import videoModification from '../../components/main/videoModification'
import videoList from '../../components/main/videoList'
import videoDetaile from '../../components/main/videoDetaile'
import addRoadShow from '../../components/main/addRoadShow'

import addShow from '../../components/main/addRoadShow'
import queryHandler from '../../components/main/queryHandler'
Vue.use(VueRouter);
Vue.config.debug = true;
var router = new VueRouter({
  //history:true
});
Vue.filter('getUrl', val => {
  var _url = '';
  if (val == null || val == undefined || val == '') {
    _url = '../../../assets/Group-1.png';
  } else {
    _url = val;
  }
  return _url;
})

router.map({
  '/loginIn': {
    component: loginIn
  },
  '/navOneAuditing': {
    component: navOneAuditing
  },
  '/navOneAuditAll': {
    component: navOneAuditAll,
  },
  '/navTwoCont': {
    component: navTwoCont
  },
  '/navTwoPoint': {
    component: navTwoPoint
  },
  '/navThree': {
    component: navThree
  },
  '/navFour': {
    component: navFour
  },

  '/navOneAuditAll/membership/:id': {
    name: 'membership',
    component: membership
  },
  '/navOneAuditing/memberhandler/:id': {
    name: 'memberhandler',
    component: queryHandler
  },
  '/navThree/addShow/:id': {
    component: addShow
  },
  '/videoList': {
    component: videoList
  },
  '/videoDetaile': {
    component: videoDetaile
  },

  '/addRoadShow': {
    component: addRoadShow
  },

})
router.redirect({
  '*': '/loginIn'
});
router.start(mainApp, '#mainManApp');
