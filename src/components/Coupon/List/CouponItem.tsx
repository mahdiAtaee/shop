import React from 'react'
import { TableRow, TableCell } from "@mui/material"
import ICoupon from '../ICoupon'
import { toPersianNumber } from '../../../services/lang'
import { toPersianCurrency } from '../../../services/Currency'
import Status from './Status'
import CouponStatus from '../CouponStatus'
const CouponItem = ({
    code,
    percent,
    limit,
    used,
    expires_at,
    constraints,
    status
}: Partial<ICoupon>) => {
    return (
        <TableRow>
            <TableCell align="center">{code}</TableCell>
            <TableCell align="center">
                {toPersianNumber(percent as number)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(limit as number)}
            </TableCell>
            <TableCell align="center">
                {toPersianNumber(expires_at as unknown as string)}
            </TableCell>
            <TableCell align="center">
                {<Status status={status as CouponStatus} />}
            </TableCell>
            <TableCell align="center">
            </TableCell>
        </TableRow>
    )
}

export default CouponItem