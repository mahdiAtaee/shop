import React from "react";
import { Box, FormControlLabel, Switch, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import AttributeItem from "./AttributeItem";
import { useCategoriesState } from "../context";

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    attributeRow: {
      margin: important(theme.spacing(0, 1)),
    },
    box: {
      margin: important(theme.spacing(2)),
    },
    formControl: {
      minWidth: important("120px"),
      margin: important(theme.spacing(0, 2)),
    },
  })
);

const Attribute = ({
  hash,
  title,
  slug,
  filterable,
  hasPrice,
}: AttributeItem) => {
  const styles = useStyles();
  const { dispatch } = useCategoriesState();
  const updateField = (field: string, value: string | boolean) => {
    dispatch({
      type: "UPDATE_ATTRIBUTE",
      payload: {
        attributeID: hash,
        data: {
          [field]: value,
        },
      },
    });
  };
  return (
    <Box className={styles.box}>
      <TextField
        id="title"
        name="title"
        label="عنوان فارسی"
        variant="outlined"
        className={styles.attributeRow}
        defaultValue={title}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
          updateField(event.currentTarget.name, event.currentTarget.value)
        }
      />
      <TextField
        id="slug"
        name="slug"
        label="عنوان انگلیسی"
        variant="outlined"
        className={styles.attributeRow}
        defaultValue={slug}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
          updateField(event.currentTarget.name, event.currentTarget.value)
        }
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked={filterable}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateField(event.currentTarget.name, event.currentTarget.checked)
            }
          />
        }
        label="استفاده برای فیلتر"
        id="filterable"
        name="filterable"
      />
      <FormControlLabel
        control={
          <Switch
            defaultChecked={hasPrice}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateField(event.currentTarget.name, event.currentTarget.checked)
            }
          />
        }
        label="استفاده برای قیمت"
        id="hasPrice"
        name="hasPrice"
      />
    </Box>
  );
};

export default Attribute;
