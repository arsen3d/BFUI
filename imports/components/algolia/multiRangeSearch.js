import React from 'react';
import { Radio, RadioGroup } from './algoliaComponent.style';
import { FormControlLabel } from '../uielements/form';

export default ({ onSearchChange, searchInfo }) => {
  const value = searchInfo.searchState.multiRange || { price: '' };
  const options = [
    { value: ':10', label: '<$10' },
    { value: '10:100', label: '$10-$100' },
    { value: '100:500', label: '$100-$500' },
    { value: '500:', label: '>$500' },
    { value: '', label: 'All' },
  ];
  return (
    <RadioGroup
      value={value.price}
      onChange={(event, price) => onSearchChange({ multiRange: { price } })}
    >
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option.value}
          control={<Radio color="primary" />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};
