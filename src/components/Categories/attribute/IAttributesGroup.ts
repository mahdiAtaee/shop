import AttributeItem from "./IAttributeItem";


export default interface IAttributesGroup {
    hash: string
    name: string
    slug: string
    filters: AttributeItem[]
}