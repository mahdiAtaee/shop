import React from "react";
import Content from "../partial/Content";
import SkeletonLoading from "../util/Skeleton";
import { Grid2 } from "@mui/material";


export default function Products() {
  return (
    <Content title="لیست محصولات">
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
    </Content>
  );
}
