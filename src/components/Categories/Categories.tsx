import React, { useEffect, useState } from "react";
import Content from "../partial/Content";
import CategoriesTable from "./CategoriesTable";
import ICategoryItem from "../contracts/ICategoryItem";
import Http from "../../services/Http";

const Categories = () => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  useEffect(() => {
    const httpClient = new Http();
    httpClient.get<ICategoryItem[]>("api/v1/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <Content title="لیست دسته بندی ها">
      <CategoriesTable
        columns={["عنوان", "اسلاگ"]}
        data={categories}
        attributes={["title", "slug"]}
      />
    </Content>
  );
};

export default Categories;
