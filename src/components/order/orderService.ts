import NotFoundException from "../exceptions/NotFoundException";
import IOrder from "./model/IOrder";
import OrderStatus from "./model/OrderStatus";
import IOrderRepository from "./repositories/IOrderRepository";
import OrderMongoRepository from "./repositories/OrderMongoRepository";
import StatusVerifier from "./services/StatusVerfier";

export default class OrderService {
    private readonly orderRepository: IOrderRepository
    private readonly statusVerifier
    constructor() {
        this.orderRepository = new OrderMongoRepository()
        this.statusVerifier = new StatusVerifier()
        this.updateStatus = this.updateStatus.bind(this)
    }
    public async updateStatus(orderID: string, newStatus: OrderStatus): Promise<boolean> {
        const order: IOrder | null = await this.orderRepository.findOne(orderID)
        if (!order) {
            throw new NotFoundException("سفارش مورد نظر یافت نشد!")
        }
        const canBeStartTransition = this.statusVerifier.verify(newStatus as OrderStatus, order.status as OrderStatus)
        if (canBeStartTransition) {
            const updateResult = await this.orderRepository.updateOne({ _id: orderID }, { status: newStatus })
            if(updateResult) return true
        }
        return false
    }
}