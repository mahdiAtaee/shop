export default interface IOrderLine {
    product: {
        title: string,
        stock: number,
        thumbnail: string
    };
    price: number;
    discountedPrice: number;
    count: number;
    created_at: Date;
}