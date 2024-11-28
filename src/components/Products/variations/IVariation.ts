export interface IVariationItem {
  title: string;
  value: string;
}

export interface IVariation {
  hash: string;
  name: string;
  title: string;
  type: string;
  items: IVariationItem[];
}
