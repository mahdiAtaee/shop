import React, { useEffect, useState } from "react";
import Content from "../partial/Content";
import {
  Button,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  LinearProgress,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Section from "../partial/Section";
import ImageInput from "../partial/ImageInput";
import Http from "../../services/Http";
import ICategoryItem from "../contracts/ICategoryItem";
import { debounce } from "lodash";
import ProductVariationDialog from "./ProductVariationDialog";
import { IVariation } from "./variations/IVariation";
import { v4 as uuid } from "uuid";
import Color from "./variations/Color";
import DropDown from "./variations/DropDown";
import VariantSelect from "./variations/VariantSelect";
import * as Validator from "./ProductValidator";

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

interface IAttributeItem {
  hash: string;
  value: string;
  title: string;
  slug: string;
  filterable: boolean;
  hasPrice: boolean;
}

interface IProductAttribute {
  title: string;
  attributes: IAttributeItem[];
}

interface IPriceVariationItem {
  [index: string]: string;
}

interface IPriceVariations {
  items: IPriceVariationItem;
  price: number;
}

const ProductsContent = () => {
  const styles = useStyles();
  const httpClient = new Http();
  const [priceVariation, setPriceVariation] = useState<IPriceVariationItem>();
  const [priceVariations, setPriceVariations] = useState<IPriceVariations[]>(
    []
  );
  const [priceVariationAmount, setPriceVariationAmount] = useState<number>(0);
  const [variations, setVariations] = useState<IVariation[]>([]);
  const [newVariationTitle, setNewVariationTitle] = useState<string>("");
  const [newVariationName, setNewVariationName] = useState<string>("");
  const [newVariationType, setNewVariationType] = useState<string>("");
  const [showVariationDialog, setShowVariationDialog] =
    useState<boolean>(false);
  const [showPriceVariationDialog, setShowPriceVariationDialog] =
    useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [productAttribute, setProductAttribute] = useState<IProductAttribute[]>(
    []
  );
  const [progress, setProgress] = useState<number>(0);
  const [errorBag, setErrorBag] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  useEffect(() => {
    httpClient
      .get<ICategoryItem[]>("api/v1/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = Validator.validateTitle(e.target.value);

    if (result) {
      setErrorBag(errorBag.set("title", result));
    } else {
      errorBag.delete("title");
      setErrorBag(errorBag);
    }
    setTitle(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = Validator.validatePrice(e.target.value);
    if (result) {
      setErrorBag(errorBag.set("price", result));
    } else {
      errorBag.delete("price");
      setErrorBag(errorBag);
    }
    setPrice(e.target.value as unknown as number);
  };

  const handleChangeDiscountedPrice = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const result = Validator.validateDiscountedPrice(e.target.value);
    if (result) {
      setErrorBag(errorBag.set("discountedPrice", result));
    } else {
      errorBag.delete("discountedPrice");
      setErrorBag(errorBag);
    }
    setDiscountedPrice(e.target.value as unknown as number);
  };

  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = Validator.validateStock(e.target.value);
    if (result) {
      setErrorBag(errorBag.set("stock", result));
    } else {
      errorBag.delete("stock");
      setErrorBag(errorBag);
    }
    setStock(e.target.value as unknown as number);
  };

  const handleChangeCategory = (
    event: SelectChangeEvent<string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    child: React.ReactNode
  ) => {
    httpClient
      .get<IProductAttribute[]>(
        `api/v1/categories/${event.target.value}/attributes`
      )
      .then((response) => {
        setProductAttribute(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setSelectedCategory(event.target.value)
  };

  const updateThumbnail = (file: File) => {
    setThumbnail(file);
  };

  const updateGallery = (file: File) => {
    setGallery((prev: File[]) => {
      return [...prev, file];
    });
  };

  const saveProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("price", price as unknown as string);
    form.append("discountedPrice", discountedPrice as unknown as string);
    form.append("stock", stock as unknown as string);
    form.append("thumbnail", thumbnail as Blob);
    form.append("category", selectedCategory);
    form.append("variation", JSON.stringify(variations));
    form.append("priceVariation", JSON.stringify(priceVariations));
    gallery.forEach((file: File) => {
      form.append("gallery", file as Blob);
    });
    form.append("attributes", JSON.stringify(productAttribute));
    httpClient.post("api/v1/products", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent =
          progressEvent.total &&
          Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent as number);
      },
    });
  };

  const handleChangeAttribute = (
    e: React.ChangeEvent<HTMLInputElement>,
    hash: string
  ) => {
    e.preventDefault();
    updateAttributeByHash(hash, e.target.value);
  };

  const updateAttributeByHash = debounce((hash: string, value: string) => {
    setProductAttribute(
      productAttribute.map((group: IProductAttribute) => {
        const newAttribute = group.attributes.map(
          (attribute: IAttributeItem) => {
            if (attribute.hash === hash) {
              return { ...attribute, value };
            }
            return attribute;
          }
        );
        group.attributes = newAttribute;
        return group;
      })
    );
  }, 1000);

  const handleChangeVariationTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVariationTitle(e.target.value);
  };
  const handleChangeVariationType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVariationType(e.target.value);
  };
  const handleChangeVariationName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewVariationName(e.target.value);
  };

  const addVariation = (e: React.MouseEvent) => {
    e.preventDefault();
    const hash = uuid();
    setVariations((prev) => {
      return [
        ...prev,
        {
          hash,
          name: newVariationName,
          title: newVariationTitle,
          type: newVariationType,
          items: [],
        },
      ];
    });
    setShowVariationDialog(false);
  };

  const addPriceVariantItem = (type: string, value: string) => {
    setPriceVariation((prev) => ({ ...prev, [type]: value }));
  };
  const addPriceVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    setPriceVariations((prev) => [
      ...prev,
      {
        items: priceVariation as IPriceVariationItem,
        price: priceVariationAmount,
      },
    ]);
    setShowPriceVariationDialog(false);
  };

  const AddNewItem = (
    e: React.MouseEvent,
    variantTitle: string,
    variantValue: string,
    hash: string
  ) => {
    setVariations(
      variations.map((variation: IVariation) => {
        if (variation.hash === hash) {
          return {
            ...variation,
            items: [
              ...variation.items,
              {
                title: variantTitle,
                value: variantValue,
              },
            ],
          };
        }
        return variation;
      })
    );
  };

  return (
    <Content title="ویرایش / اضافه کردن محصول">
      <Dialog open={showPriceVariationDialog} maxWidth="xs" fullWidth={true}>
        <DialogTitle>قیمت متغییر محصول</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <TextField
              id="variation_price"
              name="variation_price"
              label="قیمت"
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPriceVariationAmount(e.target.value as unknown as number)
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPriceVariationDialog(false)}>
            لغو
          </Button>
          <Button onClick={addPriceVariant}>ایجاد</Button>
        </DialogActions>
      </Dialog>
      <ProductVariationDialog
        onChangeShowDialog={(isOpen) => setShowVariationDialog(isOpen)}
        handleChangeVariationTitle={handleChangeVariationTitle}
        handleChangeVariationType={handleChangeVariationType}
        handleChangeVariationName={handleChangeVariationName}
        addVariation={addVariation}
        showDialog={showVariationDialog}
      />
      <LinearProgress
        variant="determinate"
        value={progress}
        style={{ marginBottom: "10px", marginTop: "15px" }}
      />
      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={handleChangeTitle}
          error={errorBag.has("title")}
          helperText={errorBag.has("title") && errorBag.get("title")}
          id="title"
          name="title"
          label="عنوان محصول"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={handleChangePrice}
          error={errorBag.has("price")}
          helperText={errorBag.has("price") && errorBag.get("price")}
          id="price"
          name="price"
          label="قیمت به ریال"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={handleChangeDiscountedPrice}
          error={errorBag.has("discountedPrice")}
          helperText={
            errorBag.has("discountedPrice") && errorBag.get("discountedPrice")
          }
          id="discounted_price"
          name="discounted_price"
          label="قیمت ویژه"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth className={styles.formRow}>
        <TextField
          onChange={handleChangeStock}
          error={errorBag.has("stock")}
          helperText={errorBag.has("stock") && errorBag.get("stock")}
          id="stock"
          name="stock"
          label="موجودی"
          variant="outlined"
        />
      </FormControl>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <FormControl
            variant="standard"
            fullWidth
            sx={{ m: 2, minWidth: 120 }}
          >
            <InputLabel id="categories-lable">دسته بندی</InputLabel>
            <Select
              labelId="categories-lable"
              id="categories"
              label="دسته بندی"
              onChange={handleChangeCategory}
            >
              <MenuItem value={0}>دسته بندی را انتخاب کنید</MenuItem>
              {categories &&
                categories?.map((category) => (
                  <MenuItem key={category?.id} value={category?.id}>
                    {category?.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
      <Section title="تصویر شاخص">
        <ImageInput onChange={updateThumbnail} />
      </Section>
      <Section title="گالری تصاویر">
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <ImageInput onChange={updateGallery} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <ImageInput onChange={updateGallery} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <ImageInput onChange={updateGallery} />
          </Grid2>
        </Grid2>
      </Section>
      {productAttribute.length > 0 ? (
        <Section title="مشخصات محصول">
          {productAttribute.map((group: IProductAttribute) => {
            return (
              <>
                <Typography variant="h6">{group.title}</Typography>
                <Divider />
                {group.attributes.map((attribute: IAttributeItem, index) => (
                  <FormControl key={index} fullWidth className={styles.formRow}>
                    <TextField
                      label={attribute.title}
                      variant="outlined"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeAttribute(e, attribute.hash);
                      }}
                    />
                  </FormControl>
                ))}
              </>
            );
          })}
        </Section>
      ) : null}
      <Section title="متغییر های محصول">
        {variations.map((variation: IVariation) => {
          if (variation.type === "color") {
            return (
              <Color
                key={variation.hash}
                title={variation.title}
                items={variation.items}
                hash={variation.hash}
                onAddColor={(
                  e: React.MouseEvent,
                  variantTitle: string,
                  variantValue: string
                ) => AddNewItem(e, variantTitle, variantValue, variation.hash)}
              />
            );
          }
          return (
            <DropDown
              key={variation.hash}
              title={variation.title}
              items={variation.items}
              hash={variation.hash}
              onItemAdded={(
                e: React.MouseEvent,
                colorTitle: string,
                colorHex: string
              ) => AddNewItem(e, colorTitle, colorHex, variation.hash)}
            />
          );
        })}
        <FormControl fullWidth className={styles.formRow}>
          <ButtonGroup>
            <Button onClick={() => setShowVariationDialog(true)}>
              افزودن متغییر محصول
            </Button>
          </ButtonGroup>
        </FormControl>
      </Section>
      {variations.length > 0 ? (
        <Section title="متغییر های قیمت">
          {variations.map((variation: IVariation) => {
            return (
              <VariantSelect
                title={variation.title}
                items={variation.items}
                name={variation.name}
                key={variation.hash}
                onItemChanged={addPriceVariantItem}
              />
            );
          })}
          <FormControl fullWidth className={styles.formRow}>
            <Button
              variant="contained"
              onClick={() => {
                setShowPriceVariationDialog(true);
              }}
            >
              افزودن متغییر قیمت جدید
            </Button>
          </FormControl>
        </Section>
      ) : null}
      <FormControl fullWidth className={styles.formRow}>
        <Button
          disabled={errorBag.size > 0}
          variant="contained"
          onClick={saveProduct}
        >
          ذخیره محصول
        </Button>
      </FormControl>
    </Content>
  );
};

export default ProductsContent;
