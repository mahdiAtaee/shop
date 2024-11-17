import React, { useState } from 'react'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(5),
    },
    nestedText: {
      fontSize: ".99em !important",
      textAlign: "right"
    },
    linkItem: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

const Customers = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
    <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="مشتریان" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="لیست مشتریان"
            />
          </ListItemButton>
        </List>
      </Collapse></>
  )
}

export default Customers