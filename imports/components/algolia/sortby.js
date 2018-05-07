import React from 'react';
import { MenuItem } from '../uielements/menus';
import { Select } from './algoliaComponent.style';

export default ({ onSearchChange, searchInfo }) => {
  const value = searchInfo.searchState.sortBy || 'default_search';
  const options = [
    { value: 'default_search', label: 'Default' },
    { value: 'price_asc', label: 'Lowest Price' },
    { value: 'price_desc', label: 'Highest Price' },
  ];
  return (
    <Select
      value={value}
      name="Sort by"
      onChange={event => onSearchChange({ sortBy: event.target.value })}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
