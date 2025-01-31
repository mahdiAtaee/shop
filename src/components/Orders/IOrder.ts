import IOrderLine from './IOrderLine';
import OrderStatus from './OrderStatus'

export default interface IOrder {
    id: string;
    user: {
        firstName: string,
        lastName: string,
        email: string
    };
    totalPrice: number;
    finalPrice: number;
    coupon: object;
    deliveryAddress: object;
    orderLines: IOrderLine[];
    created_at: Date;
    updated_at: Date;
    status: OrderStatus;
}