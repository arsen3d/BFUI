import React from "react";
import Badge from "./badge.style";
import IconButton from "material-ui/IconButton";
import Icon from "../../../components/uielements/icon/index.js";

export default ({ classes }) => {
  return (
    <div>
      <Badge className={classes.badge} badgeContent={4} color="primary">
        <Icon>mail</Icon>
      </Badge>
      <Badge className={classes.badge} badgeContent={10} color="secondary">
        <Icon>mail</Icon>
      </Badge>
      <IconButton>
        <Badge className={classes.badge} badgeContent={4} color="primary">
          <Icon>mail</Icon>
        </Badge>
      </IconButton>
    </div>
  );
};
