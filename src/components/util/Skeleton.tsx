import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Divider, Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    Rectangle: {
      margin: theme.spacing(1, 2),
    },
  })
);

export default function SkeletonLoading() {
  const classes = useStyles();
  return (
    <Stack spacing={1}>
      <div className={classes.wrapper}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
        <Divider />
        <Skeleton
          variant="rectangular"
          width={170}
          height={10}
          className={classes.Rectangle}
        />
      </div>
    </Stack>
  );
}
