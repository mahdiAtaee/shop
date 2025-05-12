import IAttributesGroup from "../Categories/attribute/IAttributesGroup";

export default interface ICategoryItem {
  id: string;
  name: {
    'FA': string,
    "EN": string
  };
  slug: string
  parentId: string | null
  level?: string
  icon: string
  isActive: boolean
  filterGroups: IAttributesGroup[]
}
