/* eslint-disable react/prop-types */
import React from 'react'
import useAppContext from '@/context/useAppContext'
import * as API from '@/services/api'

const PaymentForm = ({ gateways }) => {
    const { state, dispatch } = useAppContext()
    const handleChangeMethod = (method) => {
        dispatch({
            type: "UPDATE_PAYMENT_METHOD",
            payload: { method }
        })
    }

    const SubmitOrder = () => {
        API.post('/purchase', { ...state }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error.message))
    }

    return (
        <>
            <h4 className="mb-3">پرداخت</h4>
            <div className="d-block my-3">
                {gateways && gateways.map((gateway, index) => (
                    <div key={index} className="custom-control custom-radio">
                        <input
                            id={gateway.name}
                            name="paymentMethod"
                            type="radio"
                            onChange={() => { handleChangeMethod(gateway.name) }}
                            className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor={gateway.name}>
                            {gateway.title}
                        </label>
                    </div>
                ))}
            </div>
            <hr className="mb-4" />
            <button onClick={SubmitOrder} className="btn btn-primary btn-lg btn-block" type="submit">
                پرداخت
            </button>
        </>
    )
}

export default PaymentForm