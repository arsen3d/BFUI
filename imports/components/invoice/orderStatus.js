import React, { Component } from 'react';
import classNames from 'classnames';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Paper from '../uielements/paper';
import Button from '../uielements/button';

const styles = {
  root: {
    display: 'flex',
  },
  popperClose: {
    pointerEvents: 'none',
  },
};

class MenuListComposition extends Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, value, onChange, orderStatusOptions } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <Button
              aria-owns={open ? 'menu-list' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              color="primary"
            >
              {value}
            </Button>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
            id="order-drop-list"
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper>
                  <MenuList role="menu">
                    {orderStatusOptions.map(option => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          onChange(option);
                          this.handleClose();
                        }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

export default withStyles(styles)(MenuListComposition);
