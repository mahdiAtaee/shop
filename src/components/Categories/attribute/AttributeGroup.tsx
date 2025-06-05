/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Typography,
  Theme,
  FormControl,
  Button,
} from "@mui/material";
import React from "react";
import IAttributeGroup from "./IAttributesGroup";
import { makeStyles, createStyles } from "@mui/styles";
import { AddBox, Delete } from "@mui/icons-material";
import { useCategoriesState } from "../context";
import NewAttributeValue from "./NewAttributeValue";
import { v4 as uuid } from "uuid";

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: important(theme.spacing(1)),
      fontSize: ".9em",
    },
    formControl: {
      margin: important(theme.spacing(3, "auto")),
    },
  })
);

const AttributeGroup: React.FC<IAttributeGroup> = ({
  name,
  hash,
  slug,
  filters
}: IAttributeGroup) => {
  const styles = useStyles();
  const { state, dispatch } = useCategoriesState();
  const handleAddAttribute = (e: React.MouseEvent) => {
    e.preventDefault();
    
    dispatch({
      type: "ADD_ATTRIBUTE",
      payload: {
        groupID: hash,
        filters: [],
      },
    });
  };
  const handleDeleteAttributeGroup = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_ATTRIBUTE_GROUP",
      payload: { hash },
    });
  };


  return (
    <Box>
      <Box justifyContent={"space-between"} marginTop={"3rem"} display={"flex"}>
        <Typography variant="h6" className={styles.title}>
          {name}
        </Typography>
        <FormControl>
          <Button
            color="error"
            variant="outlined"
            startIcon={<Delete />}
            onClick={handleDeleteAttributeGroup}
          >
            حذف گروه
          </Button>
        </FormControl>
      </Box>
      <Divider />

      {filters.map((filter,index) => (        
        <NewAttributeValue key={index} hash={filter.uid} />
      ))}

      <FormControl className={styles.formControl}>
        <Button
          variant="contained"
          startIcon={<AddBox />}
          onClick={handleAddAttribute}
        >
          اضافه کردن ویژگی جدید
        </Button>
      </FormControl>
    </Box>
  );
};

export default AttributeGroup;
