import React, { useState } from "react";
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
import ListIcon from "@mui/icons-material/List";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(5),
    },
    nestedText: {
      fontSize: ".99em !important",
      textAlign: "right",
    },
    linkItem: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

const Orders = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <ShoppingBasketIcon />
        </ListItemIcon>
        <ListItemText primary="مدیریت سفارشات" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to='/orders' className={classes.linkItem}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.nestedText }}
                primary="لیست سفارشات"
              />
              <Stack
                spacing="4"
                direction="row"
                sx={{ color: "action.active", mr: 2 }}
              >
                <Badge color="error" badgeContent={110} max={99} />
              </Stack>
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
};

export default Orders;
