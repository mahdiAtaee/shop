export default interface PaymentGateway {
    paymentRequest(): any
    paymentVerify(): any
}