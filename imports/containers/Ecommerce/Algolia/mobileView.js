import React, { Component } from 'react';
import EmptyComponent from '../../../components/emptyComponent';
import { InstantSearch } from 'react-instantsearch/dom';
import Content from './content';
import { Footer, Sidebar } from '../../../components/algolia';
import { setUrl, getInitData } from '../../../helpers/urlSync';
import { AlgoliaSearchConfig } from '../../../settings';
import AlgoliaSearchPageWrapper, { Button } from './algolia.style';

export default class extends Component {
  state = {
    collapsed: true,
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
    const { collapsed } = this.state;
    const className = collapsed ? '' : 'sidebarOpen';
    const btnText = collapsed ? 'Show Sidebar' : 'Apply Filter';
    const searchInfo = {
      ...AlgoliaSearchConfig,
      indexName: this.state.indexName,
      searchState: this.state.searchState,
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
      <AlgoliaSearchPageWrapper className={`${className}`}>
        <Button
          onClick={() => {
            this.setState({ collapsed: !this.state.collapsed });
          }}
        >
          {btnText}
        </Button>
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
