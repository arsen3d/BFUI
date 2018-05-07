import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../components/uielements/icon/index.js";
import Button from "../../../components/uielements/button";
import IconButton from "../../../components/uielements/iconbutton";
import Typography from "../../../components/uielements/typography";
import Tooltip from "../../../components/uielements/tooltip";

function SimpleTooltips(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip id="tooltip-icon" title="Delete" placement="bottom">
        <IconButton aria-label="Delete">
          <Icon>delete</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip
        id="tooltip-fab"
        className={classes.fab}
        title="Add"
        placement="bottom"
      >
        <Button variant="fab" color="primary" aria-label="Add">
          <Icon>add</Icon>
        </Button>
      </Tooltip>
      <br />
      <br />
      <Typography>The fab on the right is absolutly positionned:</Typography>
      <Tooltip placement="bottom" title="Position absolute">
        <Button
          variant="fab"
          color="secondary"
          className={props.classes.absolute}
        >
          <Icon>add</Icon>
        </Button>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SimpleTooltips;
