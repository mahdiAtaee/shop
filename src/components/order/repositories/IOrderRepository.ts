import IRepository from "../../contracts/IRepository";
import IOrder from "../model/IOrder";


export default interface IOrderRepository extends IRepository<IOrder> {
    findByStatus(status: OrderStatus): Promise<IOrder[]>
}