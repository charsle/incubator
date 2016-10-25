/**
 * Mutations 本质上是一个事件系统：每个 mutation 都有一个 事件名 (name) 和 一个 回调函数 (handler).
 * 任何一个 Mutation handler 的第一个参数永远为所属 store 的整个 state 对象：
 */

import * as types from './mutation-types'

export default {
	[types.RECALL_PROJECT](state, list) {
		state.recallProject = list;
	}, [types.ADD_OR_UPDATE_VIDEO_ITEM](state, list) {
		state.addOrUpdateVideoItem = list;
	}, [types.ADD_CHOOSE_PARSON](state, list) {
		state.addChoosePerson = list;
	}, [types.CHOOSE_PARSON_ITEM](state, list) {
		state.choosePersonItem = list;
	}, [types.WEB_ADD_POINT_PROJECT](state, list) {
		state.webAddPointProject = list;
	}, [types.APPLY_LIST](state, list) {
		state.applyList = list;
	}
}