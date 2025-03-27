import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import CategoriesEdit from "../components/Categories/CategoriesEdit";
import ProductsEdit from "../components/Products/ProductsEdit";
import Orders from "../components/Orders/Orders";
import OrderDetails from "../components/Orders/OrderDetails";
import { Payments } from "../components/Payments/Payments";
import { Coupons } from "../components/Coupon/Coupons";
import CreateCoupon from "../components/Coupon/CreateCoupon";

interface routeItem {
  path: string;
  component: React.ComponentType;
}

const routes: routeItem[] = [
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products/edit",
    component: ProductsEdit,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/categories/edit",
    component: CategoriesEdit,
  },
  {
    path: "/orders",
    component: Orders
  },
  {
    path: "/orders/:orderID",
    component: OrderDetails
  },
  {
    path: "/payments",
    component: Payments
  },
  {
    path: "/coupons",
    component: Coupons
  },
  {
    path: "/coupons/new",
    component: CreateCoupon
  }
];

const RenderRoutes = () => {
  return (
    <Routes>
      {routes.map((route: routeItem, i) => (
        <Route key={i} path={route.path} Component={route.component} />
      ))}
    </Routes>
  );
};

export default RenderRoutes;
