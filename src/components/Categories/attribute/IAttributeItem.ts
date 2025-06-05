import FilterValueEnum from "./FilterValueEnum";

interface IAttributeOption {
    value: string,
    label: string
}

interface IAttributeRange {
    min: number,
    max: number,
    label: string
}

export default interface IAttributeItem {
    uid: string;
    name: {
        fa: string,
        en: string
    },
    slug: string,
    type: FilterValueEnum,
    values: string[]
    options: IAttributeOption[],
    rangeBuckets: IAttributeRange[],
    filterable: boolean,
    hasPrice: boolean
}