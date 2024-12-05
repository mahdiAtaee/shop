import ProductStatus from "./ProductStatus";

export default interface IProduct {
  _id: string;
  title: string;
  price: number;
  discountedPrice: number;
  stock: number;
  thumbnail?: string;
  gallery?: string[];
  category: string;
  attributes: object[];
  variation: object[];
  priceVariation: object[];
  created_at: Date;
  updated_at: Date;
  status: ProductStatus;
}
