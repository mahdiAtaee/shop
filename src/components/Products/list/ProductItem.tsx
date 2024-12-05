import React from "react";
import IProduct from "../IProduct";
import { Button, FormControl, Stack, TableCell, TableRow } from "@mui/material";
import { toPersianCurrency } from "../../../services/Currency";
import { toPersianNumber } from "../../../services/lang";
import Status from "../Status";
import ProductStatus from "../ProductStatus";

const ProductItem = ({
  title,
  created_at,
  price,
  status,
  updated_at,
  thumbnail,
  stock,
}: Partial<IProduct>) => {
  return (
    <TableRow>
      <TableCell align="center">
        <img
          src={thumbnail}
          alt="product thumbnail"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
        />
      </TableCell>
      <TableCell align="center">{title}</TableCell>
      <TableCell align="center">
        {toPersianCurrency(price as unknown as number)}
      </TableCell>
      <TableCell align="center">
        {toPersianNumber(stock as unknown as number)}
      </TableCell>
      <TableCell align="center">
        {<Status status={status as ProductStatus} />}
      </TableCell>
      <TableCell align="center">
        {toPersianNumber(created_at as unknown as string)}
      </TableCell>
      <TableCell align="center">
        {toPersianNumber(updated_at as unknown as string)}
      </TableCell>
      <TableCell align="center">
        <Stack spacing={1}>
          <FormControl>
            <Button variant="outlined" size="small">
              ویرایش
            </Button>
          </FormControl>
          <FormControl>
            <Button variant="outlined" size="small" color="error">
              حذف
            </Button>
          </FormControl>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
