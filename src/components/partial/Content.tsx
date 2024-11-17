import React from "react";
import { Box, Divider, Paper, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

interface contentProps {
  title: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PaperTitle: {
      padding: theme.spacing(1, 2),
      fontWeight: "bold",
      fontSize: "0.99rem",
    },
    PaperContent: {
      padding: theme.spacing(1, 2),
      fontSize: "0.99rem",
    },
  })
);

const Content = ({
  title,
  children,
}: React.PropsWithChildren<contentProps>) => {
  const styles = useStyles();
  return (
    <Paper elevation={0}>
      <Typography className={styles.PaperTitle} variant="h6">
        {title}
      </Typography>
      <Divider />
      <Box component="div" className={styles.PaperContent}>
        {children}
      </Box>
    </Paper>
  );
};

export default Content;
