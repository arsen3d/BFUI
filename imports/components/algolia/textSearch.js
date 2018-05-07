import React from 'react';
import TextField from '../uielements/inputSearch';

export default ({ onSearchChange, searchInfo, className }) => {
  const value = searchInfo.searchState.query || '';
  return (
    <TextField
      alwaysDefaultValue
      defaultValue={value}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder="Search here"
      className={className}
      onChange={query => onSearchChange({ query })}
    />
  );
};
