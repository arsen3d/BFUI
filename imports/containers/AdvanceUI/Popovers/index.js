import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import IntlMessages from '../../../components/utility/intlMessages';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import { Row } from '../../../components/utility/rowColumn';
import Popovers from './popovers';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 4,
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class PopoversExamples extends Component {
  render() {
    const { props } = this;
    return (
      <LayoutWrapper>
        <Row>
          <Papersheet title={<IntlMessages id="sidebar.popover" />}>
            <Popovers {...props} />
          </Papersheet>
        </Row>
      </LayoutWrapper>
    );
  }
}
export default withStyles(styles)(PopoversExamples);
