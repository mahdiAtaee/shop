import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Http from "../../services/Http";

interface CategoryItem {
  title: string;
  hash: string;
  slug: string;
}

const CategoriesTable = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  useEffect(() => {
    const httpClient = new Http();
    httpClient.get("api/v1/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>عنوان</TableCell>
            <TableCell>اسلاگ</TableCell>
            <TableCell>اکشن ها</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.hash}>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
