import React, { useEffect, useMemo, useState } from 'react'
import Content from '../partial/Content'
import { useParams } from 'react-router-dom'
import IOrder from './IOrder'
import Http from '../../services/Http'
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper'
import { Divider, Typography, SelectChangeEvent, Grid2 as Grid, FormControl, InputLabel, MenuItem, Select, Button, AlertColor } from '@mui/material'
import IOrderLine from './IOrderLine'
import OrderStatus from './OrderStatus'
import Popup from '../partial/Popup'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1461c4",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const createFinalPrice = (orderLine: IOrderLine): number => {
    if (orderLine.discountedPrice > 0) {
        return orderLine.discountedPrice * orderLine.count
    }
    return orderLine.price * orderLine.count
}

interface IResponseData {
    message: string,
    success: boolean
}

interface IAlertData {
    message: string,
    severity: AlertColor
}


const OrderDetails = () => {
    const { orderID } = useParams()
    const [order, setOrder] = useState<IOrder | null>(null)
    const [orderStatus, setOrderStatus] = useState<OrderStatus>(order?.status!)
    const [showSnack, setShowSnack] = useState<boolean>(false)
    const [snackData, setSnackData] = useState<IAlertData>({
        message: '',
        severity: 'success'
    })
    const httpService = useMemo(() => new Http(), [])
    useEffect(() => {
        const fetchOrder = () => {
            try {
                httpService.get<IOrder>(`api/v1/admin/orders/${orderID}`)
                    .then(({ data }) => {
                        setOrder(data as IOrder)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {

            }
        }
        fetchOrder()

    }, [orderID])

    const changeOrderStatus = (
        event: SelectChangeEvent<string>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        child: React.ReactNode
    ) => {
        setOrderStatus(event.target.value as unknown as OrderStatus)
    }
    const updateOrderStatus = () => {
        httpService.patch(`api/v1/admin/orders/${orderID}`, {
            orderStatus
        }).then(({ data }) => {
            const response = data as unknown as IResponseData
            setShowSnack(true)
            setSnackData({
                message: response.message,
                severity: response.success ? "success" : "error"
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Content title='جزییات سفارش'>
            <Typography component="h6" style={{ margin: '15px 0' }}>اطلاعات کاربر</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">نام</StyledTableCell>
                            <StyledTableCell align="center">نام خانوادگی</StyledTableCell>
                            <StyledTableCell align="center">ایمیل</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row" align="center">
                                {order?.user.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{order?.user.lastName}</StyledTableCell>
                            <StyledTableCell align="center">{order?.user.email}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider style={{ margin: "30px 0" }} />
            <Typography component="h6" style={{ margin: '0 0 15px 0' }}>جزییات سفارش</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">عنوان محصول</StyledTableCell>
                            <StyledTableCell align="center">قیمت</StyledTableCell>
                            <StyledTableCell align="center">قیمت با تخفیف</StyledTableCell>
                            <StyledTableCell align="center">تعداد</StyledTableCell>
                            <StyledTableCell align="center">قیمت نهایی</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order?.orderLines.map((orderLine: IOrderLine, index: number) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {orderLine.product && orderLine.product.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{orderLine.price}</StyledTableCell>
                                    <StyledTableCell align="center">{orderLine.discountedPrice}</StyledTableCell>
                                    <StyledTableCell align="center">{orderLine.count}</StyledTableCell>
                                    <StyledTableCell align="center">{createFinalPrice(orderLine)}</StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container alignItems="center" marginTop="2rem">
                <Grid>
                    <FormControl fullWidth style={{ minWidth: "200px" }}>
                        <InputLabel id="orderStatusLabel">وضعیت سفارش</InputLabel>
                        <Select
                            labelId="orderStatusLabel"
                            id="orderStatus"
                            label="انتخاب وضعیت"
                            value={orderStatus as unknown as string}
                            onChange={changeOrderStatus}
                        >
                            <MenuItem value={OrderStatus.PENDING}>در حال بررسی</MenuItem>
                            <MenuItem value={OrderStatus.PAID_IN_PROGRESS}>پرداخت شده</MenuItem>
                            <MenuItem value={OrderStatus.DELIVERED}>تحویل داده شده</MenuItem>
                            <MenuItem value={OrderStatus.CANCELED}>لغو شده</MenuItem>
                            <MenuItem value={OrderStatus.REFUNDED}>مرجوع شده</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid marginLeft="1rem">
                    <Button variant='contained' onClick={updateOrderStatus}>بروزرسانی وضعیت سفارش</Button>
                </Grid>
            </Grid>
            {showSnack && (
                <Popup message={snackData.message} severity={snackData.severity} isShow={showSnack} setParentShowing={setShowSnack} />
            )}
        </Content>
    )
}

export default OrderDetails