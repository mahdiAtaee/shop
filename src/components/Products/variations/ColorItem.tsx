import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { IVariationItem } from "./IVariation";

const ColorItem = ({ title, value }: IVariationItem) => {
  return (
    <ListItem>
      <ListItemText primary={title} />
      <ListItemIcon>
        <Box
          style={{ width: "40px", height: "40px", backgroundColor: value }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

export default ColorItem;
