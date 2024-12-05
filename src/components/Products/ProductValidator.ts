export const validateTitle = (title: string): string | null => {
  console.log(title);

  if (title === "") {
    return "عنوان محصول نمیتواند خالی باشد!";
  }
  return null;
};

export const validatePrice = (price: string): string | null => {
  if (parseInt(price) === 0) {
    return "قیمت نمیتواند 0 باشد";
  } else if (price === "") {
    return "قیمت نمیتواند خالی باشد";
  }
  return null;
};

export const validateDiscountedPrice = (
  discountedPrice: string
): string | null => {
  if (parseInt(discountedPrice) === 0) {
    return "قیمت ویژه نمیتواند 0 باشد";
  } else if (discountedPrice === "") {
    return "قیمت ویژه نمیتواند خالی باشد";
  }
  return null;
};

export const validateStock = (stock: string): string | null => {
  if (stock === "") {
    return "موجودی نمیتواند خالی باشد";
  }
  return null;
};
