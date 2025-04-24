export default interface PaymentMethod {
    doPayment(): Promise<any>
}