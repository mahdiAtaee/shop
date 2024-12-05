import React from "react";
import ProductStatus from "./ProductStatus";
import { Chip } from "@mui/material";

interface productStatusProps {
  status: ProductStatus;
}

const Status = ({ status }: productStatusProps) => {
  return (
    <>
      {status == ProductStatus.INIT && (
        <Chip label="در حال آماده سازی" color="primary" size="small" />
      )}
      {status == ProductStatus.INACTIVE && (
        <Chip label="غیرفعال" color="error" size="small" />
      )}
      {status == ProductStatus.PUBLISHED && (
        <Chip label="فعال" color="success" size="small" />
      )}
    </>
  );
};

export default Status;
