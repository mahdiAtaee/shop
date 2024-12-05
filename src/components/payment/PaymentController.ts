import IPaymentRepository from "./repositories/IPaymentRepository";
import PaymentMongoRepository from "./repositories/PaymentMongoRepository";

export default class PaymentController {
    private readonly PaymentRepository: IPaymentRepository
    constructor(){
        this.PaymentRepository = new PaymentMongoRepository()
    }
}