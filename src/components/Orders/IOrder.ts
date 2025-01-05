import OrderStatus from './OrderStatus'

export default interface IOrder {
    _id: string;
    user: {
        firstName: string,
        lastName: string,
        email: string
    };
    totalPrice: number;
    finalPrice: number;
    coupon: object;
    deliveryAddress: object;
    orderLines: object[];
    created_at: Date;
    updated_at: Date;
    status: OrderStatus;
}