import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import IntlMessages from '../../../components/utility/intlMessages';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import { Row, HalfColumn } from '../../../components/utility/rowColumn';
import Simplesnackbar from './simpleSnackbar';
import PositionedSnackbar from './positionedSnackbar';
import Transitionsnackbar from './transitionSnackbar';
import Papersheet from '../../../components/utility/papersheet';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SnackbarExamples extends Component {
  render() {
    const { scrollHeight } = this.props;
    const { props } = this;
    console.log(scrollHeight);
    return (
      <LayoutWrapper style={{ minHeight: scrollHeight }}>
        <Row>
          <HalfColumn>
            <Papersheet
              title={<IntlMessages id="sidebar.simplesnackbar" />}
              stretched
            >
              <Simplesnackbar {...props} />
            </Papersheet>
          </HalfColumn>
          <HalfColumn>
            <Papersheet
              title={<IntlMessages id="sidebar.positionedsnackbar" />}
              stretched
            >
              <PositionedSnackbar {...props} />
            </Papersheet>
          </HalfColumn>
          <HalfColumn>
            <Papersheet
              title={<IntlMessages id="sidebar.transitionsnackbar" />}
            >
              <Transitionsnackbar {...props} />
            </Papersheet>
          </HalfColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}
const SnackbarExample = withStyles(styles)(SnackbarExamples);

const mapStateToProps = state => {
  return {
    scrollHeight: state.App.toJS().scrollHeight,
  };
};
const appConect = connect(mapStateToProps, {})(SnackbarExample);
export default appConect;
