import React, { useEffect, useMemo, useState } from 'react'
import { Stack, Pagination, Button } from '@mui/material'
import CouponList from './List'
import Content from '../partial/Content'
import Http from '../../services/Http'
import ICoupon from './ICoupon'
import IPagination from '../contracts/IPagination'
import { Link, useNavigate } from 'react-router-dom'

export const Coupons = () => {
  const httpClient = useMemo(() => new Http(), [])
  const [Coupons, setCoupons] = useState<ICoupon[]>([])
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<IPagination>()
  const navigate = useNavigate()
  useEffect(() => {
    const getData = async () => {
      await httpClient
        .get<{ __metadata: object, data: ICoupon[] }>(`api/v1/admin/coupons?page=${page}`)
        .then((res) => {
          setCoupons(res.data.data as ICoupon[])
          setPagination(res.data.__metadata as IPagination)
        })
    }
    getData()
  }, [page])

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?page=${value}`)
    setPage(value)
  }

  return (
    <Content title='لیست کدهای تخفیف'>
      <Link to="/coupons/new">
        <Button variant='contained' style={{ margin: '1rem 0' }}>
          ایجاد کوپن جدید
        </Button>
      </Link>
      <CouponList items={Coupons} />
      <Stack spacing={2} margin={2}>
        <Pagination count={pagination?.totalPages} onChange={handlePagination} color="primary" />
      </Stack>
    </Content>
  )
}
