import IAttribute from './IAttribute'
export default interface IAttributeCategory {
    name: string;
    slug: string,
    filters:IAttribute[]
}