import PaymentStatus from "./PaymentStatus"

export default interface IPayment {
    user: {
        firstName: string,
        lastName: string,
        email: string
    }
    order: {
        id: string
    }
    amount: number
    method: string
    reserve: string
    reference: string
    created_at: Date
    updated_at: Date
    status: PaymentStatus
}