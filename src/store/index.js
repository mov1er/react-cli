/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:49:35 
 * @About: 项目的store 
 */
import { createStore, combineReducers } from 'redux';
import loggedUserReducer from './reducers/loggedUserReducer';
import tabReducer from "./reducers/tabReducer";

const reduces = combineReducers({
  loggedUserState: loggedUserReducer,
  tabState: tabReducer
});

const store = createStore(reduces);

export default store;
