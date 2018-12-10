/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:49:35 
 * @About: 项目的store 
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import loggedUserReducer from './reducers/loggedUserReducer';
import tabReducer from "./reducers/tabReducer";

const reduces = combineReducers({
  loggedUserState: loggedUserReducer,
  tabState: tabReducer
});

const store = createStore(
  reduces,
  applyMiddleware(logger)
);

export default store;
