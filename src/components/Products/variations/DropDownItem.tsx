import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { IVariationItem } from "./IVariation";

const DropDownItem = ({ title, value }: IVariationItem) => {
  return (
    <ListItem>
      <ListItemText primary={title} secondary={value} />
    </ListItem>
  );
};

export default DropDownItem;
