/* eslint-disable react/prop-types */
import React from 'react'
import AddressForm from './AddressForm'
import useAppContext from '@/context/useAppContext'

const Addresses = ({ addresses }) => {
    const { dispatch } = useAppContext()
    const handleChangeAddress = (address) => {
        dispatch({
            type: "UPDATE_DELIVERY_ADDRESS",
            payload: { address }
        })
    }
    return (
        <>
            <h5 className="mb-4">انتخاب آدرس ارسال</h5>
            <div className="accordion accordion-style-2" id="accordion-2">
                <div className="card">
                    <div className="card-header">
                        <h6>
                            <a
                                className=""
                                data-toggle="collapse"
                                data-target="#collapse-2-1"
                                aria-expanded="false"
                            >
                                آدرس های موجود
                            </a>
                        </h6>
                    </div>
                    <div
                        id="collapse-2-1"
                        className="collapse show"
                        data-parent="#accordion-2"
                        style={{}}
                    >
                        <div className="card-body">
                            <div className="list-group list-group-gap p-0">
                                <div className="list-group-item border-0 p-0">
                                    {addresses.length <= 0 && (
                                        <div className="d-flex align-items-center">
                                            <i className="vl-building mr-4 fa-2x d-block text-primary pb-2"></i>
                                            <div>
                                                <h6 className="mb-0">آدرسی ذخیره نشده است</h6>
                                            </div>
                                        </div>)}
                                    {addresses.map((address, index) => (
                                        <div key={index} className="d-flex align-items-center">
                                            <div className="custom-control custom-radio custom-control-inline d-flex align-items-center justify-content-center">
                                                <input
                                                    type="radio"
                                                    id={`address-${index}`}
                                                    name="deliveryAddress"
                                                    onChange={() => { handleChangeAddress(address) }}
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label d-flex align-items-center justify-content-center" htmlFor={`address-${index}`}>
                                                    <h5 className="mb-0 font-weight-bold">{address.title}</h5>
                                                    <i className="vl-building mr-4 fa-2x d-block text-primary pb-2"></i>
                                                    <div className='w-100 mt-4'>
                                                        <h6 className="mb-1 font-weight-normal text-muted">{address.fullName}</h6>
                                                        <span>{address.address}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h6>
                            <a
                                className="collapsed"
                                data-toggle="collapse"
                                data-target="#collapse-2-2"
                            >
                                اضافه کردن آدرس جدید
                            </a>
                        </h6>
                    </div>
                    <div id="collapse-2-2" className="collapse" data-parent="#accordion-2">
                        <div className="card-body">
                            <AddressForm />
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Addresses