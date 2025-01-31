import React from "react";
import OrderStatus from "./OrderStatus";
import { Chip } from "@mui/material";

interface orderStatusProps {
    status: OrderStatus;
}

const Status = ({ status }: orderStatusProps) => {
    return (
        <>
            {status == OrderStatus.PENDING && (
                <Chip label="در حال آماده سازی" color="primary" size="small" />
            )}
            {status == OrderStatus.CANCELED && (
                <Chip label="لغو شده" color="error" size="small" />
            )}
            {status == OrderStatus.DELIVERED && (
                <Chip label="تحویل داده شده" color="primary" size="small" />
            )}
            {status == OrderStatus.PAID_IN_PROGRESS && (
                <Chip label="‌‌پرداخت شده" color="success" size="small" />
            )}
            {status == OrderStatus.REFUNDED && (
                <Chip label="مرجوع شده" color="error" size="small" />
            )}
        </>
    );
};

export default Status;
