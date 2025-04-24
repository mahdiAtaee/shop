import useAppContext from '@/context/useAppContext'
import { amountWithDiscount, calculateDiscountAmount } from '@/services/discount'
import { toPersianNumber } from '@/services/lang'
import Link from 'next/link'
import React from 'react'

const Details = () => {
    const { state } = useAppContext()

    const TotalBasket = () => {
        return state.basket.reduce((total, item) => {
            return total + (item.count * item.discountedPrice)
        }, 0)
    }

    return (
        <div className="col-md-5">
            <div className="card p-4">
                <h6>مجموع سبد</h6>
                <hr />
                <div className="row mb-1">
                    <div className="col-8 font-weight-normal">مجموع کل</div>
                    <div className="col-4">{toPersianNumber(TotalBasket())} تومان</div>
                </div>
                <div className="row mb-1">
                    <div className="col-8 font-weight-normal">تخفیف ({state.coupon !== null && state.coupon ? toPersianNumber(state?.coupon?.percent) : 0}%)</div>
                    <div className="col-4">- {toPersianNumber(calculateDiscountAmount(TotalBasket(), (state.coupon !== null && state.coupon !== undefined ? state.coupon.percent : 0)).toFixed(0))} تومان</div>
                </div>
                <div className="row my-4">
                    <div className="col-8">مجموع خرید</div>
                    <div className="col-4">
                        <strong>{toPersianNumber(amountWithDiscount(TotalBasket(), (state.coupon !== null && state.coupon ? state.coupon.percent : 0)).toFixed(0))} تومان</strong>
                    </div>
                </div>
                <Link href="/checkout" className="btn btn-pill btn-block btn-theme">
                    بررسی
                </Link>
            </div>
        </div>

    )
}

export default Details