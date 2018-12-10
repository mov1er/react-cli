/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:54:09 
 * @About: 登陆用户reducer
 */
// eslint-disable-next-line
import { handleActions } from 'redux-actions';

const tabList = JSON.parse(sessionStorage.getItem('tabList'));

const initialState = {
  list: tabList ? tabList.list : [],
  activeKey: tabList ? tabList.activeKey : '',
}

const tabReducer = handleActions({
  'add tab'(state, action) {
    let data = action.payload;
    let findTab = state.list.find(tab => tab.key === data.key);
    let list = findTab === undefined ? [...state.list, data] : state.list;
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey: data.key}));
    return { list, activeKey: data.key }
  },
  'del tab'(state, action) {
    const { targetKey } = action.payload;
    const list = [];
    let delIndex = 0;
    let { activeKey } = state;
    state.list.map((tab, index) => tab.key === targetKey ? delIndex = index : list.push(tab));
    if (state.activeKey === targetKey) {
      activeKey = list[delIndex] ? list[delIndex].key : (list[delIndex - 1] ? list[delIndex -1].key : '');
    }
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey}));
    return { list, activeKey }
  },
  'click tab'(state, action) {
    const { activeKey } = action.payload;
    sessionStorage.setItem('tabList', JSON.stringify({ ...state, activeKey }));
    return { ...state, activeKey}
  }
}, initialState);

export default tabReducer;
