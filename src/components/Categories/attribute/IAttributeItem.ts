import FilterValueEnum from "./FilterValueEnum";

export default interface IAttributeItem {
    hash: string;
    name: {
        fa: string,
        en: string
    },
    slug: string,
    type: FilterValueEnum,
    values: string[]
    filterable: boolean,
    hasPrice: boolean
}