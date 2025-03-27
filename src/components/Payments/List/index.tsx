import React, { useEffect, useState } from 'react'
import Http from '../../../services/Http'
import IPayment from '../IPayment'
import { TableContainer, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material'
import PaymentItem from './PaymentItem'

interface PaymentProps {
  items: IPayment[]
}

const PaymentList = ({ items }: PaymentProps) => {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">مشتری</TableCell>
            <TableCell align="center">سفارش</TableCell>
            <TableCell align="center">مبلغ</TableCell>
            <TableCell align="center">پرداخت</TableCell>
            <TableCell align="center">ایجاد</TableCell>
            <TableCell align="center">به روز رسانی</TableCell>
            <TableCell align="center">وضعیت</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: IPayment, index: number) => (
            <PaymentItem {...item} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentList