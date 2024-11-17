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
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

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

const Finance = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
    <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="مدیریت مالی" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="پرداخت ها"
            />
          </ListItemButton>
          <ListItemButton sx={{pl: 4}}>
            <ListItemIcon>
              <MoneyOffIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="کد های تخفیف"
            />
          </ListItemButton>
        </List>
      </Collapse></>
  )
}

export default Finance