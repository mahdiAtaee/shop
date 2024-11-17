import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import StoreIcon from "@mui/icons-material/Store";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListIcon from "@mui/icons-material/List";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CategoryIcon from "@mui/icons-material/Category";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import React, { useState } from "react";
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

const Products = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="مدیریت محصولات" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link className={classes.linkItem} to="/products">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.nestedText }}
                primary="محصول جدید"
              />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="لیست محصولات"
            />
          </ListItemButton>
          <Link className={classes.linkItem} to="/categories/edit">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.nestedText }}
                primary="دسته بندی جدید"
              />
            </ListItemButton>
          </Link>
          <Link className={classes.linkItem} to="/categories">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.nestedText }}
                primary="دسته بندی ها"
              />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CardGiftcardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.nestedText }}
              primary="پیشنهاد های ویژه"
            />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default Products;
