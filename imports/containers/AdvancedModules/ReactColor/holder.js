import React, { Component } from 'react';
import IconButton from '../../../components/uielements/iconbutton';
import { ColorPicker, DisplayBox, ColorIcon } from './color.style';

const popover = {
  position: 'absolute',
  zIndex: '2',
};
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
};

export default class extends Component {
  state = {
    displayColorPicker: false,
    selectedColor: {
      hsl: {
        h: 23.99999999999996,
        s: 0.6791044776119404,
        l: 0.43192817059483724,
        a: 1,
      },
      hex: '#278BE1',
      rgb: { r: 185, g: 95, b: 35, a: 1 },
      hsv: {
        h: 23.99999999999996,
        s: 0.808888888888889,
        v: 0.7252525252525253,
        a: 1,
      },
      oldHue: 23.999999999999964,
      source: 'rgb',
    },
  };
  handleChange = selectedColor => this.setState({ selectedColor });

  handleClick = () =>
    this.setState({ displayColorPicker: !this.state.displayColorPicker });

  handleClose = () => this.setState({ displayColorPicker: false });

  render() {
    const { Picker } = this.props;
    const { selectedColor } = this.state;
    const choosedColor = { background: selectedColor.hex };
    return (
      <ColorPicker>
        <IconButton aria-label="Delete" onClick={this.handleClick}>
          <ColorIcon>color_lens</ColorIcon>
        </IconButton>
        <DisplayBox style={choosedColor} />
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <Picker color={selectedColor} onChange={this.handleChange} />
          </div>
        ) : null}
      </ColorPicker>
    );
  }
}
