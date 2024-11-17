import React from "react";
import { CategoriesProvider } from "./context";
import CategoriesContent from "./CategoriesContent";

const CategoriesEdit = () => {
  return (
    <CategoriesProvider>
      <CategoriesContent />
    </CategoriesProvider>
  );
};

export default CategoriesEdit;
