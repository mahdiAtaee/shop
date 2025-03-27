import React from "react";
import { Chip } from "@mui/material";
import CouponStatus from "../CouponStatus";

interface CouponStatusProps {
    status: CouponStatus;
}

const Status = ({ status }: CouponStatusProps) => {
    return (
        <>
            {status == CouponStatus.ACTIVE && (
                <Chip label="فعال" color="success" size="small" />
            )}
            {status == CouponStatus.INACTIVE && (
                <Chip label="غیرفعال" color="error" size="small" />
            )}
        </>
    );
};

export default Status;