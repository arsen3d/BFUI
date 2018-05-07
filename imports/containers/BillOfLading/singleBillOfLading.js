import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditInvoice from './editBillOfLading';
import ViewInvoice from './viewBillOfLading';
import Loader from '../../components/utility/Loader';
import invoiceActions from '../../redux/invoice/actions';

class SingleBIllOfLading extends Component {
  componentDidMount() {
    const { initialInvoices, initData } = this.props;
    if (!initialInvoices) {
      initData();
    }
    this.toggleCreatedInvoice(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.toggleCreatedInvoice(nextProps);
  }
  toggleCreatedInvoice(props) {
    const {
      match,
      initialInvoices,
      currentInvoice,
      selectCurrentInvoice
    } = props;
    const { billOfLadingId } = match.params;
    if (initialInvoices && currentInvoice.id !== billOfLadingId) {
      selectCurrentInvoice(billOfLadingId);
    }
  }
  render() {
    const { match, currentInvoice, enableEditView } = this.props;
    const redirectPath = match.url.replace(match.params.billOfLadingId, '');
    if (currentInvoice.id !== match.params.billOfLadingId) {
      return <Loader />;
    } else if (enableEditView) {
      return <EditInvoice {...this.props} redirectPath={redirectPath} />;
    } else {
      return <ViewInvoice {...this.props} redirectPath={redirectPath} />;
    }
  }
}
function mapStateToProps(state) {
  return {
    ...state.Invoices.toJS()
  };
}
export default connect(mapStateToProps, invoiceActions)(SingleBIllOfLading);
