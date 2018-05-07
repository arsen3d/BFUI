const actions = {
    GET_BILL_OF_LADING: 'GET_BILL_OF_LADING',
    UPDATE_BILL_OF_LADING: 'UPDATE_BILL_OF_LADING',
    UPDATE_BILL_OF_LADING_SAGA: 'UPDATE_BILL_OF_LADING_SAGA',
    SELECT_CURRENT_BILL_OF_LADING: 'SELECT_CURRENT_BILL_OF_LADING',
    BILL_OF_LADING_TOGGLE_VIEW: 'BILL_OF_LADING_TOGGLE_VIEW',
    UPDATE_EDIT_BILL_OF_LADING: 'UPDATE_EDIT_BILL_OF_LADING',
  initData: () => ({ type: actions.GET_BILL_OF_LADING }),
  deleteBillOfLading: selected => {
    return (dispatch, getState) => {
      const billsOfLadings  = getState().BillsOfLading.get('billsOfLading');
      const newBillsOfLadings = [];
        billsOfLadings.forEach(billOfLading => {
        const selectedIndex = selected.indexOf(billOfLading.id);
        if (selectedIndex === -1) {
            newBillsOfLadings.push(billOfLading);
        }
      });
      dispatch({
        type: actions.UPDATE_BILL_OF_LADING_SAGA,
        billsOfLading: newBillsOfLadings
      });
    };
  },
  updateBillOfLading: billOfLading => {
    return (dispatch, getState) => {
      const billsOfLading = getState().BillsOfLading.get('billsOfLading');
      const index = billsOfLading.map(bill => bill.id).indexOf(billsOfLading.id);
      if (index === -1) {
          billsOfLading.push(billOfLading);
      } else {
          billsOfLading[index] = billOfLading;
      }
      dispatch({
        type: actions.UPDATE_BILL_OF_LADING_SAGA,
          billsOfLading,
          billOfLading
      });
    };
  },
  selectBillOfLading: id => ({ type: actions.SELECT_CURRENT_BILL_OF_LADING, id }),
  toggleView: view => ({ type: actions.TOGGLE_VIEW, view }),
  editBillOfLading: billOfLading => ({ type: actions.UPDATE_EDIT_BILL_OF_LADING, billOfLading })
};
export default actions;
