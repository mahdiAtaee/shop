/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import Http from "../../services/Http";
import Content from "../partial/Content";
import OrderList from "./list";
import IOrder from "./IOrder";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IPagination from "../contracts/IPagination";
import { useNavigate, useLocation } from 'react-router-dom'
import Search from "../partial/Search";
import queryStringManager from 'query-string'

interface IQueryString {
  [key: string]: string | number
}

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null)
  const httpClient = useMemo(() => new Http(), []);
  const navigate = useNavigate()
  const location = useLocation()
  const queryStringData: IQueryString = useMemo(() => ({}), [])
  useEffect(() => {
    const queryString = queryStringManager.stringify(queryStringData)
    httpClient
      .get<{ _metadata: object, data: IOrder[] }>(`api/v1/orders?${queryString}`)
      .then((result) => {
        setOrders(result.data.data as any)
        setPagination(result.data._metadata as IPagination)
      })
      .catch((error) => console.log(error));
  }, [location]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    queryStringData.page = value
    updateSearchParams()
  }

  const handleSearch = (keyword: string) => {
    queryStringData.keyword = keyword
    delete queryStringData.page
    updateSearchParams()
  }

  const updateSearchParams = () => {
    navigate(`?${queryStringManager.stringify(queryStringData)}`)
  }

  return (
    <Content title="لیست محصولات">
      {orders && (
        <>
          <Search label="جستجو در سفارشات" onChange={handleSearch} />
          <OrderList items={orders} />
          <Stack spacing={2} margin={2}>
            <Pagination count={pagination?.totalPages} onChange={handlePagination} color="primary" />
          </Stack>
        </>
      )}
    </Content>
  )
}
