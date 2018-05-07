import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Hits, Pagination, Stats } from 'react-instantsearch/dom';
import ecommerceActions from '../../../redux/ecommerce/actions';
import Hit from './hit';
import SortBy from '../../../components/algolia/sortby';
import {
  ContentWrapper,
  TopbarWrapper,
  ListIcon,
  GridIcon,
  PaginationStyleWrapper,
} from '../../../components/algolia/algoliaComponent.style';

const { changeView } = ecommerceActions;

class Content extends Component {
  render() {
    const { view } = this.props;
    return (
      <ContentWrapper className="algoliaContentWrapper">
        <TopbarWrapper className="algoliaTopBar">
          <Stats />

          <div className="sortingOpt">
            <SortBy {...this.props} />
            <div className="viewChanger">
              <button
                type="button"
                className={view === 'gridView' ? 'gridView active' : 'gridView'}
                onClick={() => this.props.changeView('gridView')}
              >
                <GridIcon>view_module</GridIcon>
              </button>
              <button
                type="button"
                className={view === 'gridView' ? 'listView' : 'listView active'}
                onClick={() => this.props.changeView('listView')}
              >
                <ListIcon>view_list</ListIcon>
              </button>
            </div>
          </div>
        </TopbarWrapper>
        <Hits hitComponent={Hit} />

        <PaginationStyleWrapper className="algoliaPagination">
          <Pagination showLast />
        </PaginationStyleWrapper>
      </ContentWrapper>
    );
  }
}
function mapStateToProps(state) {
  return {
    view: state.Ecommerce.toJS().view,
  };
}
export default connect(mapStateToProps, { changeView })(Content);
