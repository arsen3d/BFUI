import React from 'react';
import {
  SearchBox,
  RefinementList,
  StarRating,
  HierarchicalMenu,
  MultiRange,
  ClearAll,
} from 'react-instantsearch/dom';
import RangeSlider from './rangeSlider';
import VoiceRecognition from './voiceRecognition';
import MultiRangeSearch from './multiRangeSearch';
import {
  SidebarWrapper,
  SidebarItem,
  TextSearch,
} from './algoliaComponent.style';

const Sidebar = ({ onSearchChange, searchInfo }) => (
  <SidebarWrapper className="algoliaSidebar">
    <SidebarItem className="contentBox">
      <TextSearch
        className="noBorder"
        onSearchChange={onSearchChange}
        searchInfo={searchInfo}
      />
    </SidebarItem>

    <SidebarItem>
      <h3 className="algoliaSidebarTitle">Voice Search</h3>
      <VoiceRecognition onSearchChange={onSearchChange} />
    </SidebarItem>

    <SidebarItem>
      <h3 className="algoliaSidebarTitle">Multi Range</h3>
      <MultiRangeSearch
        onSearchChange={onSearchChange}
        searchInfo={searchInfo}
      />
    </SidebarItem>

    <SidebarItem>
      <h3 className="algoliaSidebarTitle" style={{ marginBottom: 10 }}>
        Slider
      </h3>
      <RangeSlider attributeName="price" />
    </SidebarItem>

    <SidebarItem>
      <h3 className="algoliaSidebarTitle">Category</h3>
      <RefinementList attributeName="categories" />
    </SidebarItem>

    <SidebarItem>
      <HierarchicalMenu
        attributes={[
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2',
        ]}
      />
    </SidebarItem>
    <SidebarItem>
      <h3 className="algoliaSidebarTitle">Rating</h3>
      <StarRating attributeName="rating" />
    </SidebarItem>

    <ClearAll />
    <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}>
      <SearchBox />
      <MultiRange
        attributeName="price"
        items={[
          { end: 10, label: '<$10' },
          { start: 10, end: 100, label: '$10-$100' },
          { start: 100, end: 500, label: '$100-$500' },
          { start: 500, label: '>$500' },
        ]}
      />
    </div>
  </SidebarWrapper>
);

export default Sidebar;
