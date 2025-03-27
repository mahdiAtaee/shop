import React from "react";
import { Chip } from "@mui/material";
import PaymentStatus from "../PaymentStatus";

interface paymentStatusProps {
    status: PaymentStatus;
}

const Status = ({ status }: paymentStatusProps) => {
    return (
        <>
            {status == PaymentStatus.PENDING && (
                <Chip label="در حال پرداخت" color="primary" size="small" />
            )}
            {status == PaymentStatus.FAILED && (
                <Chip label="ناموفق" color="error" size="small" />
            )}
            {status == PaymentStatus.SUCCESS && (
                <Chip label="موفق" color="success" size="small" />
            )}
        </>
    );
};

export default Status;