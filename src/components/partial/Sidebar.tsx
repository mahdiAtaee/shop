import { Divider, List, Paper } from "@mui/material";
import React from "react";
import Products from "../Menu/products/Products";
import Orders from "../Menu/Orders/Orders";
import Finance from "../Menu/finance/Finance";
import Delivery from "../Menu/delivery/Delivery";
import Feedbacks from "../Menu/feedbacks/Feedbacks";
import Customers from "../Menu/customers/Customers";
import Settings from "../Menu/settings/Settings";

const Sidebar = () => {
  return (
    <Paper>
      <List component={"nav"}>
        <Products />
        <Divider />
        <Orders />
        <Divider />
        <Finance />
        <Divider />
        <Delivery />
        <Divider />
        <Feedbacks />
        <Divider />
        <Customers />
        <Divider />
        <Settings />
      </List>
    </Paper>
  );
};

export default Sidebar;
