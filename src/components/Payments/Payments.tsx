import React, { useEffect, useMemo, useState } from 'react'
import { Stack, Pagination } from '@mui/material'
import PaymentList from './List'
import Content from '../partial/Content'
import Http from '../../services/Http'
import IPayment from './IPayment'
import IPagination from '../contracts/IPagination'
import { useNavigate } from 'react-router-dom'

export const Payments = () => {
  const httpClient = useMemo(() => new Http(), [])
  const [payments, setPayments] = useState<IPayment[]>([])
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<IPagination>()
  const navigate = useNavigate()
  useEffect(() => {
    const getData = async () => {
      await httpClient
        .get<{ __metadata: object, data: IPayment[] }>(`api/v1/admin/payments?page=${page}`)
        .then((res) => {
          setPayments(res.data.data as IPayment[])
          setPagination(res.data.__metadata as IPagination)
        })
    }
    getData()
  }, [page])

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    navigate(`?page=${value}`)
  }

  return (
    <Content title='لیست پرداخت ها'>
      <PaymentList items={payments} />
      <Stack spacing={2} margin={2}>
        <Pagination count={pagination?.totalPages} onChange={handlePagination} color="primary" />
      </Stack>
    </Content>
  )
}
