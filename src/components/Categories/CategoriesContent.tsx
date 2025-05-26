import React, { useState, useEffect } from "react";
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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Theme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { AddBox, Save } from "@mui/icons-material";
import { useCategoriesState } from "./context";
import Http from "../../services/Http";
import { v4 as uuid } from "uuid";
import ICategoryItem from "../contracts/ICategoryItem";
import IAttributesGroup from "./attribute/IAttributesGroup";

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
interface INewCategoryResponse {
  newCategory: object;
  success: boolean;
}

const CategoriesContent = () => {
  const classes = useStyles();
  const { state, dispatch } = useCategoriesState();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [attributeSlug, setAttributeSlug] = useState<string>("")
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState<notificationMessage>({
    message: "",
    type: "success",
  });
  const [categories, setCategories] = useState<ICategoryItem[]>()
  const httpClient = new Http();
  

  useEffect(() => {
    httpClient
      .get(`api/v1/admin/categories`)
      .then((response) => {
        const data = response.data as { success: boolean; categories: ICategoryItem[] };
        if (data.success) {
          setCategories(data.categories);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

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
      payload: { title, slug: attributeSlug, hash: uuid() },
    });
    setOpen(false);
  };

  const updateTitle = (name: string, lang: string) => {
    dispatch({
      type: "UPDATE_CATEGORY_NAME",
      payload: {
        name,
        lang
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

  const updateCategoryParent = (parentId: string) => {
    dispatch({
      type: "UPDATE_CATEGORY_PARENT",
      payload: { parentId }
    })
  }


  const SaveCategory = async () => {
    console.log(state);

    const { data } = await httpClient.post(
      "api/v1/admin/categories",
      {
        ...state,
      }
    );
    setShowNotify(true);
    const result = data as INewCategoryResponse
    if (result.success === true) {
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
          <TextField
            required
            margin="dense"
            id="attributes_group_slug"
            label="اسلاگ - انگلیسی"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAttributeSlug(event.currentTarget.value)
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
            id="titleFa"
            name="titleFa"
            label="عنوان - فارسی"
            variant="outlined"
            defaultValue={state.name.FA}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              updateTitle(event.currentTarget.value, "FA")
            }
          />
        </FormControl>
        <FormControl fullWidth className={classes.formRow}>
          <TextField
            id="titleEn"
            name="titleEn"
            label="عنوان - انگلیسی"
            variant="outlined"
            defaultValue={state.name.EN}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
              updateTitle(event.currentTarget.value, "EN")
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
        <FormControl fullWidth>
          <InputLabel id="category-parent">دسته بندی والد</InputLabel>
          <Select
            labelId="category-parent"
            id="parentId"
            value={state.parentId == null ? undefined : state.parentId}
            label="دسته بندی والد"
            onChange={(event: SelectChangeEvent<string>,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              child: React.ReactNode) => updateCategoryParent(event.target.value)}
          >
            {categories && categories?.map((item: ICategoryItem) => (
              <MenuItem key={item.id} value={item.id}>{item.name ? item.name.FA : ''}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {state.filterGroups.map((group: IAttributesGroup) => (
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
