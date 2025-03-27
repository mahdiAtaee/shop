import React from 'react'
import { TableRow, TableCell } from "@mui/material"
import IPayment from '../IPayment'
import { toPersianNumber } from '../../../services/lang'
import { toPersianCurrency } from '../../../services/Currency'
import Status from './Status'
import PaymentStatus from '../PaymentStatus'
const PaymentItem = ({
  user,
  order,
  amount,
  method,
  created_at,
  updated_at,
  status
}: Partial<IPayment>) => {
  return (
    <TableRow>
      <TableCell align="center">{`${user?.firstName} ${user?.lastName}`}</TableCell>
      <TableCell align="center">
        {order?.id}
      </TableCell>
      <TableCell align="center">
        {toPersianCurrency(amount as number)}
      </TableCell>
      <TableCell align="center">
        {method}
      </TableCell>
      <TableCell align="center">
        {toPersianNumber(created_at as unknown as string)}
      </TableCell>
      <TableCell align="center">
        {toPersianNumber(updated_at as unknown as string)}
      </TableCell>
      <TableCell align="center">
        {<Status status={status as PaymentStatus} />}
      </TableCell>
    </TableRow>
  )
}

export default PaymentItem