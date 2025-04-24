import PaymentGateway from "../contracts/PaymentGateway";
import ZarinPalCheckout from "zarinpal-checkout";

export default class ZarinPal implements PaymentGateway {
    constructor() { }
    public async paymentRequest(): Promise<any> {
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const appUrl = process.env.APP_URL
        const zarinpal = ZarinPalCheckout.create(merchant, sandbox);

        const requestResult = await zarinpal
            .PaymentRequest({
                Amount: "1000", // In Tomans
                CallbackURL: `${appUrl}/payment/verify/zarinpal`,
                Description: "بابت پرداخت سفارش شماره",
            })

        if (requestResult && requestResult.status === 100) {
            return {
                success: true,
                url: requestResult.url
            }
        }
        return {
            success: false
        }
    }
    public async paymentVerify(): Promise<any> {
        const merchant = process.env.ZARINPAL_MERCHANT
        const sandbox = process.env.ZARINPAL_SANDBOX
        const appUrl = process.env.APP_URL
        const zarinpal = ZarinPalCheckout.create(merchant, sandbox);

        const verifyResult = await zarinpal
            .PaymentVerification({
                Amount: "1000", // In Tomans
                Authority: "000000000000000000000000000000000000",
            })

        if (verifyResult && verifyResult.status === 100) {
            return {
                success: true,
                refID: verifyResult.RefID
            }
        }
        return {
            success: false
        }
    }

}