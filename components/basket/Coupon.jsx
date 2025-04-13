import React, { useState } from 'react'
import * as API from '@/services/api'
import Notify from '../partials/Notification/Notify'
import useAppContext from '@/context/useAppContext'

const Coupon = () => {
    const [couponCode, setCouponCode] = useState()
    const [applyResult, setApplyResult] = useState({
        status: null,
        message: ''
    })
    const { dispatch } = useAppContext()

    const applyCoupon = (e) => {
        e.preventDefault()

        if (couponCode === '' && couponCode === undefined && couponCode === null) {
            return false
        }

        API.post('/coupons/validation', { couponCode })
            .then(response => {
                setApplyResult({
                    status: true,
                    message: response.data.message
                })
                dispatch({
                    type: "UPDATE_COUPON",
                    payload: { ...response.data.coupon }
                })
            })
            .catch(error => {
                setApplyResult({
                    status: false,
                    message: error.response.data.message
                })
            })

    }

    return (
        <div className="col-md-7">
            <h6>تخفیف کوپن</h6>
            <p className="text-muted">لطفا کد کوپن خود را در صورت لزوم وارد کنید</p>
            {applyResult.status === false && <Notify message={applyResult.message} status={false} />}
            {applyResult.status === true && <Notify message={applyResult.message} status={true} />}
            <form className="d-md-flex mt-lg-4 mt-3 mb-4">
                <input
                    type="text"
                    className="form-control mr-2 mb-2"
                    placeholder="کد کوپن"
                    value={couponCode} onChange={(e) => setCouponCode(e.target.value.trim())}
                />
                <button type="submit" onClick={applyCoupon} className="btn btn-pill btn-solid-dark mr-2  mb-2">
                    اعمال کوپن
                </button>
                <button type="submit" className="btn btn-pill btn-outline  mb-2">
                    بروز سبد
                </button>
            </form>
        </div>

    )
}

export default Coupon