import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  SelectChangeEvent,
} from "@mui/material";
import { IVariationItem } from "./IVariation";
import { makeStyles, createStyles } from "@mui/styles";

function important<T>(value: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value + " !important") as any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    VariantFormStyle: {
      margin: important(theme.spacing(2)),
    },
  })
);

interface VariantSelectProps {
  title: string;
  name:string;
  items: IVariationItem[];
  onItemChanged: (name: string, value: string) => void;
}

const VariantSelect = ({
  title,
  name,
  items,
  onItemChanged,
}: VariantSelectProps) => {
  const styles = useStyles();
  const handleChangeVairant = (
    event: SelectChangeEvent<string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    child: React.ReactNode
  ) => {
    onItemChanged(name, event.target.value as string);
  };
  return (
    <FormControl
      className={styles.VariantFormStyle}
      sx={{ m: 1, minWidth: 200 }}
    >
      <InputLabel id="variant_select_lable">{`انتخاب از ${title}`}</InputLabel>
      <Select
        labelId="variant_select_lable"
        id="variant_select"
        label="انتخاب متغییر قیمت"
        onChange={handleChangeVairant}
      >
        <MenuItem value="">
          <em>بدون متغییر</em>
        </MenuItem>
        {items.map((variationItem: IVariationItem, index) => {
          return (
            <MenuItem value={variationItem.value} key={index}>
              {variationItem.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default VariantSelect;
