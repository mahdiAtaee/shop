/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import Content from "../partial/Content";
import SkeletonLoading from "../util/Skeleton";
import { Grid2 } from "@mui/material";
import Http from "../../services/Http";
import ProductsList from "./list";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const httpClient = useMemo(() => new Http(), []);
  useEffect(() => {
    httpClient
      .get("api/v1/products")
      .then((result) => setProducts(result.data as any))
      .catch((error) => console.log(error));
  }, []);
  return (
    <Content title="لیست محصولات">
      {products ? (
        <ProductsList items={products} />
      ) : (
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <SkeletonLoading />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <SkeletonLoading />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <SkeletonLoading />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <SkeletonLoading />
          </Grid2>
        </Grid2>
      )}
    </Content>
  );
}
