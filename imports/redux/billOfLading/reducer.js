import clone from 'clone';
import { Map } from 'immutable';
import { newBillOfLading } from '../../containers/BillOfLading/config';
import actions from './actions';

const initState = new Map({
  billsOfLading: [],
  initialBillsOfLading: false,
  currentBillOfLading: {},
  editableBillOfLading: {},
  isNewBillOfLading: false,
  enableEditView: false
});

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.UPDATE_BILL_OF_LADING: {
      const currentBillOfLading = action.billsOfLading
        ? action.billsOfLading
        : state.get('currentBillOfLading');
      return state
        .set('billsOfLading', action.billsOfLading)
        .set('currentBillOfLading', clone(currentBillOfLading))
        .set('initialBillsOfLading', true)
        .set('isNewBillOfLading', false)
        .set('enableEditView', false);
    }
    case actions.SELECT_CURRENT_BILL_OF_LADING: {
      const billsOfLading = state.get('billsOfLading');
      const index = billsOfLading.map(billOfLading => billOfLading.id).indexOf(action.id);
      const isNewBillOfLading = index === -1;
      const currentBillOfLading = isNewBillsOfLading
        ? {
            id: action.id,
            number: `#${action.id}`,
            key: action.id,
            ...newBillOfLading
          }
        : billsOfLading[index];
      const enableEditView = isNewBillOfLading;
      return state
        .set('currentBillOfLading', currentBillOfLading)
        .set('editableBillOfLading', clone(currentBillOfLading))
        .set('isNewBillOfLading', isNewBillOfLading)
        .set('enableEditView', enableEditView);
    }
    case actions.TOGGLE_VIEW:
      return state
        .set('enableEditView', action.view)
        .set('editableBillsOfLading', clone(state.get('currentBillOfLading')));
    case actions.UPDATE_EDIT_BILL_OF_LADING:
      return state.set('editableBillOfLading', clone(action.billsOfLading));
    default:
      return state;
  }
}
