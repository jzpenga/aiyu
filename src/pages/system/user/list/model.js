import * as service from '../service';
import config from '../../../../utils/config';
import * as routerRedux from 'react-router-redux';
import {message} from 'antd';

export default {
  namespace: 'userList',
  state: {
    queryParam: {},
    userListData: [],
    pageNo: 0,
    total: 0,
    charge:0,
    balance:0
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    queryParamChange: (state, { payload: { queryParam } }) => {
      return { ...state, queryParam };
    },
    refreshUserList: (state, { payload: { userListData, pageNo, total } }) => {
      return { ...state, userListData, pageNo, total };
    },
  },
  effects: {
    * queryUserList({ payload }, { call, put }) {
      let { data } = yield call(service.fetchUserList, payload);
      let userListData = data.list;
      yield put({
        type: 'refreshUserList',
        payload: { userListData, pageNo: data.pageNum, total: data.total },
      });
    },
    * deleteUser({ payload }, { call, put }) {
      let data = yield call(service.deleteUser, { id: payload });
      yield put({
        type: 'queryUserList',
        payload: { pageNo: 1 },
      });
      yield put({
        type: 'queryParamChange',
        payload: { queryParam: {} },
      });
    },
    * deleteUserList({ payload }, { call, put }) {
      let data = yield call(service.deleteUserList, payload);
      yield put({
        type: 'queryUserList',
        payload: { pageNo: 1 },
      });
      yield put({
        type: 'queryParamChange',
        payload: { queryParam: {} },
      });
    },
    * queryBalance({ payload }, { call, put }) {
      let {data} = yield call(service.queryBalance, payload);
      //console.log(data);
      yield put({
        type: 'updateState',
        payload: { balance: data.balance },
      });
    },
    * getCharge({ payload }, { call, put }) {
      let {data} = yield call(service.getCharge, payload);
      //console.log(data);
      yield put({
        type: 'updateState',
        payload: { charge: data.paramValue },
      });
    },
    * batchTransfer({ payload }, { call, put }) {
      let data = yield call(service.batchTransfer, payload);
      if(data.responseCode === 200){
        //成功
        message.info('转账成功',1,()=>{
          document.location.reload();
        });
      }else {
        message.error(data.responseMsg);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/system/user/list') {
          dispatch({ type: 'queryUserList', payload: { pageNo: 1 } });
          dispatch({ type: 'getCharge'});
        }
      });
    },
  },

};
