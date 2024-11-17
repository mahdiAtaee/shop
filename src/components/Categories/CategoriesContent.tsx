import React, { useState } from "react";
import Content from "../partial/Content";
import AttributeGroup from "../Categories/attribute/AttributeGroup";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Snackbar,
  Theme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { AddBox, Save } from "@mui/icons-material";
import { useCategoriesState } from "./context";
import Http from "../../services/Http";
import { v4 as uuid } from "uuid";

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formRow: {
      margin: important(theme.spacing(2, "auto")),
    },
  })
);

interface notificationMessage {
  message: string;
  type: AlertColor;
}

const CategoriesContent = () => {
  const classes = useStyles();
  const { state, dispatch } = useCategoriesState();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState<notificationMessage>({
    message: "",
    type: "success",
  });
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  const openDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleAddAttributesGroupTitle = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_ATTRIBUTE_CATEGORY",
      payload: { title, hash: uuid() },
    });
    setOpen(false);
  };

  const updateTitle = (title: string) => {
    dispatch({
      type: "UPDATE_CATEGORY_TITLE",
      payload: {
        title,
      },
    });
  };

  const updateSlug = (slug: string) => {
    dispatch({
      type: "UPDATE_CATEGORY_SLUG",
      payload: {
        slug,
      },
    });
  };

  const SaveCategory = async () => {
    const httpClient = new Http();
    const { data } = await httpClient.post("api/v1/categories", {
      ...state,
    });
    setShowNotify(true);
    console.log(data);
    if (data.success === true) {
      setNotifyMessage({
        message: "دسته بندی با موفقیت ذخیره شد",
        type: "success",
      });
    } else {
      setNotifyMessage({
        message: "ذخیره دسته بندی با خطا مواجه شد",
        type: "error",
      });
    }
  };

  const handleCloseNotify = () => {
    setShowNotify(false);
  };

  return (
    <Content title="ویرایش / اضافه کردن دسته بندی ">
      <Snackbar
        open={showNotify}
        autoHideDuration={3000}
        onClose={handleCloseNotify}
      >
        <Alert
          severity={notifyMessage.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notifyMessage.message}
        </Alert>
      </Snackbar>
      <Dialog open={open}>
        <DialogTitle>عنوان دسته بندی ویژگی ها</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="attributes_group_title"
            label="عنوان"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.currentTarget.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
          <Button onClick={handleAddAttributesGroupTitle}>تایید</Button>
        </DialogActions>
      </Dialog>
      <Box component="form">
        <FormControl fullWidth className={classes.formRow}>
          <TextField
            id="title"
            name="title"
            label="عنوان - فارسی"
            variant="outlined"
            defaultValue={state.title}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              updateTitle(event.currentTarget.value)
            }
          />
        </FormControl>
        <FormControl fullWidth className={classes.formRow}>
          <TextField
            id="slug"
            name="slug"
            label="اسلاگ - انگلیسی"
            variant="outlined"
            defaultValue={state.slug}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              updateSlug(event.currentTarget.value)
            }
          />
        </FormControl>
      </Box>
      {state.groups.map((group) => (
        <AttributeGroup key={group.hash} {...group} />
      ))}
      <FormControl className={classes.formRow}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddBox />}
          onClick={openDialog}
        >
          اضافه کردن دسته بندی ویژگی ها
        </Button>
      </FormControl>
      <Grid container justifyContent={"flex-end"}>
        <Button
          color="success"
          variant="contained"
          startIcon={<Save />}
          onClick={SaveCategory}
        >
          ذخیره سازی
        </Button>
      </Grid>
    </Content>
  );
};

export default CategoriesContent;
