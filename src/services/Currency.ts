const persianFormatter = new Intl.NumberFormat("fa-IR", {
  style: "currency",
  currency: "IRR",
});

export const toPersianCurrency = (currency: number) => {
  return persianFormatter.format(currency);
};
