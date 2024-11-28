import {
  Button,
  Divider,
  List,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  FormControl,
  Theme,
} from "@mui/material";
import React, { useState } from "react";
import { IVariationItem } from "./IVariation";
import ColorItem from "./ColorItem";
import { createStyles, makeStyles } from "@mui/styles";

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    PaperBox: {
      margin: important(theme.spacing(2, "auto")),
      border: "1px solid #eee",
      borderBottom: "0px",
      padding: theme.spacing(2),
    },
    addBox: {
      margin: important(theme.spacing(2, "auto")),
      width: '100%'
    },
  })
);

interface ColorVariationProps {
  hash: string;
  title: string;
  items: IVariationItem[];
  onAddColor: (
    e: React.MouseEvent,
    colorTitle: string,
    colorHex: string
  ) => void;
}

const Color = ({ title, hash, items, onAddColor }: ColorVariationProps) => {
  const styles = useStyles();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [colorTitle, setColorTitle] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("#000000");
  return (
    <Paper elevation={1} className={styles.PaperBox}>
      <Dialog open={showDialog} maxWidth="xs" fullWidth={true}>
        <DialogTitle>افزودن رنگ جدید</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <TextField
              id="color_title"
              name="color_title"
              label="عنوان رنگ"
              variant="outlined"
              value={colorTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColorTitle(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <TextField
              type="color"
              id="color_value"
              name="color_value"
              label="کد رنگ"
              variant="outlined"
              value={colorHex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColorHex(e.target.value);
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>لغو</Button>
          <Button
            onClick={(e: React.MouseEvent) => {
              onAddColor(e, colorTitle, colorHex);
              setShowDialog(false);
              setColorTitle("");
              setColorHex("");
            }}
          >
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h6">{title}</Typography>
      <Divider />
      <List>
        {items.map((item: IVariationItem) => (
          <ColorItem key={hash} {...item} />
        ))}
        <FormControl fullWidth>
          <Button
            variant="contained"
            color="inherit"
            className={styles.addBox}
            onClick={() => setShowDialog(true)}
          >
            اضافه کردن رنگ جدید
          </Button>
        </FormControl>
      </List>
    </Paper>
  );
};

export default Color;
