import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import IProduct from "../IProduct";
import ProductItem from "./ProductItem";

interface productListProps {
  items: IProduct[];
}

const index = ({ items }: productListProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">تصویر شاخص</TableCell>
            <TableCell align="center">عنوان</TableCell>
            <TableCell align="center">قیمت</TableCell>
            <TableCell align="center">موجودی</TableCell>
            <TableCell align="center">وضعیت</TableCell>
            <TableCell align="center">ایجاد</TableCell>
            <TableCell align="center">به روز رسانی</TableCell>
            <TableCell align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: IProduct) => (
            <ProductItem {...item} key={item._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default index;
