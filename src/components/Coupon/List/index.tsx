import React, { useEffect, useState } from 'react'
import ICoupon from '../ICoupon'
import { TableContainer, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material'
import CouponItem from './CouponItem'

interface CouponProps {
  items: ICoupon[]
}

const CouponList = ({ items }: CouponProps) => {

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">کد</TableCell>
            <TableCell align="center">درصد</TableCell>
            <TableCell align="center">محدودیت</TableCell>
            <TableCell align="center">انقضاء</TableCell>
            <TableCell align="center">وضعیت</TableCell>
            <TableCell align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: ICoupon, index: number) => (
            <CouponItem {...item} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CouponList