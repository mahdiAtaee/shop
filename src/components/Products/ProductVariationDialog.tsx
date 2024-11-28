import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";

interface VariationProps {
  showDialog: boolean;
  onChangeShowDialog: (isOpen: boolean) => void;
  handleChangeVariationTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeVariationType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeVariationName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addVariation: (e: React.MouseEvent) => void;
}

const ProductVariationDialog = ({
  showDialog,
  onChangeShowDialog,
  handleChangeVariationTitle,
  handleChangeVariationType,
  handleChangeVariationName,
  addVariation,
}: VariationProps) => {
  return (
    <Dialog open={showDialog} maxWidth="xs" fullWidth={true}>
      <DialogTitle>افزودن متغییر محصول جدید</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <TextField
            id="variation_title"
            name="variation_title"
            label="عنوان متغیر محصول"
            variant="outlined"
            onChange={handleChangeVariationTitle}
          />
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <TextField
            id="variation_name"
            name="variation_name"
            label="نام متغیر محصول"
            variant="outlined"
            placeholder="مثلا: size,colors,material"
            onChange={handleChangeVariationName}
          />
        </FormControl>
        <FormControl style={{ marginTop: "1rem" }}>
          <FormLabel id="demo-radio-buttons-group-label">
            نوع متغیر محصول
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={handleChangeVariationType}
          >
            <FormControlLabel value="color" control={<Radio />} label="رنگ" />
            <FormControlLabel
              value="dropDown"
              control={<Radio />}
              label="لیست کشویی"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onChangeShowDialog(false)}>لغو</Button>
        <Button onClick={addVariation}>ایجاد</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductVariationDialog;
