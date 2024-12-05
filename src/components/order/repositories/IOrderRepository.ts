import IRepository from "../../contracts/IRepository";
import IOrder from "../model/IOrder";
import OrderStatus from "../model/OrderStatus";

export default interface IOrderRepository extends IRepository<IOrder> {
    findByStatus(status: OrderStatus): Promise<IOrder[]>
}