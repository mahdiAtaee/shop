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
import DropDownItem from "./DropDownItem";
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

interface DropDownVariationProps {
  hash: string;
  title: string;
  items: IVariationItem[];
  onItemAdded: (
    e: React.MouseEvent,
    dropDownTitle: string,
    dropDownValue: string
  ) => void;
}

const DropDown = ({ title, hash, items, onItemAdded }: DropDownVariationProps) => {
  const styles = useStyles();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dropDownTitle, setDropDownTitle] = useState<string>("");
  const [dropDownValue, setDropDownValue] = useState<string>("");
  return (
    <Paper elevation={1} className={styles.PaperBox}>
      <Dialog open={showDialog} maxWidth="xs" fullWidth={true}>
        <DialogTitle>افزودن آیتم جدید</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <TextField
              id="dropDown_title"
              name="dropDown_title"
              label="عنوان آیتم"
              variant="outlined"
              value={dropDownTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDropDownTitle(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <TextField
              type="dropDown"
              id="dropDown_value"
              name="dropDown_value"
              label="مقدار آیتم"
              variant="outlined"
              value={dropDownValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDropDownValue(e.target.value);
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>لغو</Button>
          <Button
            onClick={(e: React.MouseEvent) => {
              onItemAdded(e, dropDownTitle, dropDownValue);
              setShowDialog(false);
              setDropDownTitle("");
              setDropDownValue("");
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
          <DropDownItem key={hash} {...item} />
        ))}
        <FormControl fullWidth>
          <Button
            variant="contained"
            color="inherit"
            className={styles.addBox}
            onClick={() => setShowDialog(true)}
          >
            اضافه کردن آیتم جدید
          </Button>
        </FormControl>
      </List>
    </Paper>
  );
};

export default DropDown;
