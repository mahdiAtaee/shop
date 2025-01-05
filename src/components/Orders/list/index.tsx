import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import IOrder from "../IOrder";
  import OrderItem from "./OrderItem";
  
  interface orderListProps {
    items: IOrder[];
  }
  
  const index = ({ items }: orderListProps) => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">مشتری</TableCell>
              <TableCell align="center">قیمت</TableCell>
              <TableCell align="center">تعداد آیتم</TableCell>
              <TableCell align="center">ایجاد</TableCell>
              <TableCell align="center">به روز رسانی</TableCell>
              <TableCell align="center">وضعیت</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: IOrder) => (
              <OrderItem {...item} key={item._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default index;
  