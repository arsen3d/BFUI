import React, { Component } from 'react';
import { InstantSearch } from 'react-instantsearch/dom';
import Content from './content';
import { Footer, Sidebar } from '../../../components/algolia';
import EmptyComponent from '../../../components/emptyComponent';
import { AlgoliaSearchConfig } from '../../../settings';
import { setUrl, getInitData } from '../../../helpers/urlSync';
import AlgoliaSearchPageWrapper from './algolia.style';

export default class extends Component {
  state = {
    searchState: getInitData(),
    indexName: 'default_search'
  };
  onSearchChange = options => {
    const searchState = {
      ...this.state.searchState,
      page: '1',
      ...options
    };
    if (options.sortBy) {
      this.setState({ searchState, indexName: options.sortBy });
    } else {
      this.setState({ searchState });
    }
    setUrl(searchState);
  };
  render() {
    const searchInfo = {
      ...AlgoliaSearchConfig,
      searchState: this.state.searchState,
      indexName: this.state.indexName,
      urlSync: true,
      onSearchStateChange: searchState => {
        this.setState({ searchState });
        setUrl(searchState);
      }
    };
    const options = {
      onSearchChange: this.onSearchChange,
      searchInfo
    };
    return (
      <AlgoliaSearchPageWrapper>
        {AlgoliaSearchConfig.appId ? (
          <InstantSearch {...searchInfo}>
            <div className="algoliaMainWrapper">
              <Sidebar {...options} />
              <Content {...options} />
            </div>
            <Footer />
          </InstantSearch>
        ) : (
          <EmptyComponent value="Please include algolia appId" />
        )}
      </AlgoliaSearchPageWrapper>
    );
  }
}
