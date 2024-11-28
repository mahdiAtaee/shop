import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
import Categories from "../components/Categories/Categories";
import CategoriesEdit from "../components/Categories/CategoriesEdit";
import ProductsEdit from "../components/Products/ProductsEdit";

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
