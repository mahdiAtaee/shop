import React from "react";
import Content from "../partial/Content";
import SkeletonLoading from "../util/Skeleton";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      alignItems: "center",
    },
    Rectangle: {
      margin: theme.spacing(1, 2),
    },
  })
);

export default function Products() {
  const classes = useStyles();
  return (
    <Content title="لیست محصولات" >
      <div className={classes.wrapper}>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </div>
    </Content>
  );
}
