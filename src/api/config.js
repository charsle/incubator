const ADMIN_URL = 'http://test.mm.miux.com:8088/incubator_park/'; //开发地址
export const UPLOAD_NOT_PRVATE = "http://192.168.1.63:9181/";


export const COOKIE_URL = 'http://sm.miux.com:8081/SessionManager/getSession.action?CTYPE=8'
export const LOGIN_URL = ADMIN_URL + 'web_login.action'; //登录
export const CODE_URL = ADMIN_URL + 'ESUMG003.action'; //生成图形验证码
export const ADDUPDATE_URL = ADMIN_URL + 'addOrUpdateIndustrialpark.action'; //添加/修改工业园区
export const DELEPARK_URL = ADMIN_URL + 'delIndustrialpark.action'; //删除工业园区
export const SEARCHMENBER_URL = ADMIN_URL + 'web_queryListAuthentication.action'; //查询会员审核申请列表
export const SEARCHHANDLER_URL = ADMIN_URL + 'web_handler.action'; //查询会员申请列表
//export const QUERY_HANDLER_ID_URL = ADMIN_URL + 'web_queryHandler.action';  //查询会员申请列表

export const ALLUSER_URL = ADMIN_URL + 'web_queryAllUserList.action'; //查询所有会员
export const SEARCH_BY_ACCOUNT_URL = ADMIN_URL + 'web_queryUserById.action'; //查询会员详情
export const DELETE_USER_URL = ADMIN_URL + 'web_delUser.action'; //•删除会员
export const QUERY_HENDLER_URL = ADMIN_URL + 'web_queryHandler.action'; //•
export const WEB_HANDLER_APPLY_URL = ADMIN_URL + 'web_handler.action'; //•
export const WEB_QUERY_PROJECT_URL = ADMIN_URL + 'web_queryProjectById.action'; //•查询项目详情
export const WEB_RECALL_PROJECT_URL = ADMIN_URL + 'web_recallProjectById.action'; //••撤回项目
export const WEB_DELETE_PROJECT_URL = ADMIN_URL + 'web_delProjectById.action'; //••删除项目
export const QUERY_VIDEO_LIST_URL = ADMIN_URL + 'web_queryVideoList.action'; //••查询视频列表
export const INSERT_OR_UPDATE_VIDEO_URL = ADMIN_URL + 'web_insertOrUpdateVideo.action'; //••新增/修改视频
export const QUERY_BY_VIDEO_INFO_URL = ADMIN_URL + 'web_queryVideoById.action'; //••新增/视频详情
export const DELETE_VIDEO_LIST_URL = ADMIN_URL + 'web_delVideo.action'; //••新增/视频详情
export const QUERY_POINT_LIST_URL = ADMIN_URL + 'web_queryProjectorList.action'; //••幻灯片列表
export const DELETE_POINT_ITEM_URL = ADMIN_URL + 'web_delProjector.action'; //••幻灯片列表
export const QUERY_SHOW_LIST_URL = ADMIN_URL + 'myShow.action'; //••获取路演列表（分页）
export const EDIT_SHOW_LIST_URL = ADMIN_URL + 'toEdit.action'; //••获取路演列表（分页）
export const SELECT_SHOW_USER_URL = ADMIN_URL + 'selectUser.action'; //••获取路演列表（分页）
export const ADD_PONIT_UPDATE_URL = ADMIN_URL + 'addUpdateShow.action'; //••获取路演列表（分页）
export const DELETE_POINT_LIST_UTL = ADMIN_URL + 'deleteShow.action'; //••获取路演列表（分页）
export const PUBLISH_POINT_URL = ADMIN_URL + 'publish.action'; //••获取路演列表（分页）
export const EDITPWD_URL = ADMIN_URL + 'web_editPwd.action'; //•••	修改密码
export const WEB_ADD_POINT_PROJECT = ADMIN_URL + 'web_addProjector.action'; //•••	修改密码
export const CANCLE_URL = ADMIN_URL + 'web_cancel.action'; //•••	•	后台管理端注销
