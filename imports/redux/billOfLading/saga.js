import { all, takeEvery, put } from 'redux-saga/effects';
import { localDataName, createDemoData } from '../../containers/BillOfLading/config';
import actions from './actions';

export function* getBillofLading() {
  yield put({
    type: actions.UPDATE_BILL_OF_LADING,
      billsofLading: createDemoData()
  });
}
export function* updateBillOfLadingSaga({ billsofLading, billofLading }) {
  yield localStorage.setItem(localDataName, JSON.stringify(billsOfLading));
  yield put({
    type: actions.UPDATE_BILL_OF_LADING,
      billsOfLading,
      billOfLading
  });
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_BILL_OF_LADING, getBillofLading),
    yield takeEvery(actions.UPDATE_BILL_OF_LADING_SAGA, updateBillOfLadingSaga)
  ]);
}
