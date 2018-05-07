import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet from '../../../components/utility/papersheet';
import { Row, FullColumn } from '../../../components/utility/rowColumn';
import Uppy from '../../../components/uielements/uppy';
import config from './config';
import UppyStyleWrapper from './uppy.style';
export default class extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }
  componentDidMount() {
    Uppy(config);
  }
  onSuccess(fileList) {}
  render() {
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet title="Uppy Uploader">
              <UppyStyleWrapper id="uppyHolder" />
            </Papersheet>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}
