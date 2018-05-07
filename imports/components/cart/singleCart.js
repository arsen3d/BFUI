import React, { Component } from 'react';

import { TableCell, TableRow } from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import Textfield from '../uielements/textfield';
import { notification } from '../index';

export default class CartRow extends Component {
  onChange = event => {
    const value = event.target.value;
    if (!isNaN(value)) {
      if (value !== this.props.quantity) {
        this.props.changeQuantity(this.props.objectID, value);
      }
    } else {
      notification('error', 'Please give valid number');
    }
  };

  render() {
    const {
      price,
      quantity,
      image,
      name,
      description,
      objectID,
      cancelQuantity,
    } = this.props;
    const totalPrice = (price * quantity).toFixed(2);
    return (
      <TableRow>
        <TableCell
          className="itemRemove"
          onClick={() => {
            cancelQuantity(objectID);
          }}
        >
          <Icon>clear</Icon>
        </TableCell>
        <TableCell className="itemImage">
          <img alt="#" src={image} />
        </TableCell>
        <TableCell className="itemName">
          <h3>{name}</h3>
          <p>{description}</p>
        </TableCell>
        <TableCell className="itemPrice">
          <span className="itemPricePrefix">$</span>
          {price.toFixed(2)}
        </TableCell>
        <TableCell className="itemQuantity">
          <Textfield
            min={1}
            max={1000}
            value={quantity}
            step={1}
            type="number"
            onChange={this.onChange}
          />
        </TableCell>
        <TableCell className="itemPriceTotal">${totalPrice}</TableCell>
      </TableRow>
    );
  }
}
