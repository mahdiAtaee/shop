import React, { useEffect, useState } from "react";
import Content from "../partial/Content";
import CategoriesTable from "./CategoriesTable";
import ICategoryItem from "../contracts/ICategoryItem";
import Http from "../../services/Http";

const Categories = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  useEffect(() => {
    const httpClient = new Http();
    httpClient.get("api/v1/admin/categories").then((response) => {
      const data = response.data as { success: boolean; categories: ICategoryItem[] };
      if (data.success) {
        setCategories(data.categories);
      }
    });
  }, []);

  return (
    <Content title="لیست دسته بندی ها">
      <CategoriesTable
        columns={["عنوان", "اسلاگ"]}
        data={categories}
        attributes={["name", "slug"]}
      />
    </Content>
  );
};

export default Categories;
