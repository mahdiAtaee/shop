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
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

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

const Settings = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  return (
    <>
    <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="تنظیمات" />
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
              primary="عمومی"
            />
          </ListItemButton>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <NotificationsNoneIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="اطلاع رسانی"
            />
          </ListItemButton>
        </List>
      </Collapse></>
  )
}

export default Settings