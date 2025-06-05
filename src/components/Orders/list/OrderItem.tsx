import React from "react";
import IOrder from "../IOrder";
import { Button, FormControl, Stack, TableCell, TableRow } from "@mui/material";
import { toPersianCurrency } from "../../../services/Currency";
import { toPersianNumber } from "../../../services/lang";
import OrderStatus from "../OrderStatus";
import Status from '../Status'
import { Link } from "react-router-dom";

const OrderItem = ({
    id,
    user,
    finalPrice,
    orderLines,
    status,
    created_at,
    updated_at,
}: Partial<IOrder>) => {    
    return (
        <TableRow>
            <TableCell align="center">{`${user?.firstName} ${user?.lastName}`}</TableCell>
            <TableCell align="center">
                {toPersianCurrency(finalPrice as unknown as number)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(orderLines?.length as unknown as number)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(created_at as unknown as string)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(updated_at as unknown as string)}
            </TableCell>
            <TableCell align="center">
                {<Status status={status as OrderStatus} />}
            </TableCell>
            <TableCell align="center">
                <Stack spacing={1}>
                    <FormControl>
                        <Link to={`/orders/${id}`}>
                            <Button variant="outlined" size="small">
                                جزییات
                            </Button>
                        </Link>
                    </FormControl>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

export default OrderItem;
