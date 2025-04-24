import React, { useState } from 'react'
import * as API from '@/services/api'
import useAppContext from '@/context/useAppContext'

const AddressForm = () => {
    const { state, dispatch } = useAppContext()
    const [address, setAddress] = useState({
        title: '',
        state: '',
        city: '',
        address: '',
        zipCode: '',
        fullName: '',
        mobile: '',
    })

    const handleChange = (item, value) => {
        setAddress(prev => ({ ...prev, [item]: value }))
    }

    const addAddress = () => {
        if (state.user) {
            API.post(`/users/${state.user.id}/addresses`, {
                ...address
            }, {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            }).then(() => {
                dispatch({
                    type: "ADD_ADDRESS",
                    payload: { address }
                })
            }).catch(error => {
                alert('ثبت آدرس جدید با مشکل مواجه شده است لطفا بعدا امتحان نمایید')
                console.log(error.message);
            })
        }
    }
    return (
        <form className="needs-validation" noValidate="">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="fullName">نام کامل گیرنده</label>
                    <input
                        type="text"
                        onChange={e => handleChange('fullName', e.target.value)}
                        className="form-control"
                        id="fullName"
                        placeholder=""
                        defaultValue=""
                        required=""
                    />
                    <div className="invalid-feedback">نام معتبر مورد نیاز است</div>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="mobile">شماره موبایل</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder=""
                        defaultValue=""
                        required=""
                        onChange={e => handleChange('mobile', e.target.value)}
                    />
                    <div className="invalid-feedback">موبایل معتبر مورد نیاز است</div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="title">
                    عنوان <span className="text-muted">(اختیاری)</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder=""
                    onChange={e => handleChange('title', e.target.value)}
                />
                <div className="invalid-feedback">
                    لطفا یک آدرس ایمیل معتبر برای ارسال به روز رسانی وارد کنید
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 mb-3">
                    <label htmlFor="state">استان</label>
                    <select
                        className="custom-select d-block w-100"
                        onChange={e => handleChange('state', e.target.value)}
                        id="state"
                        required=""
                    >
                        <option value="">انتخاب...</option>
                        <option value='تهران' >تهران</option>
                    </select>
                    <div className="invalid-feedback">
                        لطفا یک استان معتبر را انتخاب کنید
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="city">شهر</label>
                    <select
                        className="custom-select d-block w-100"
                        id="city"
                        required=""
                        onChange={e => handleChange('city', e.target.value)}
                    >
                        <option value="">انتخاب...</option>
                        <option value="پردیس">پردیس</option>
                    </select>
                    <div className="invalid-feedback">لطفا یک شهر معتبر ارائه کنید</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="zipCode">کد پستی</label>
                    <input
                        type="text"
                        name='zipCode'
                        className="form-control"
                        id="zipCode"
                        placeholder=""
                        required=""
                        onChange={e => handleChange('zipCode', e.target.value)}
                    />
                    <div className="invalid-feedback">کد پستی مورد نیاز است</div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="address">آدرس</label>
                <input
                    type="text"
                    name='address'
                    className="form-control"
                    id="address"
                    placeholder="خیابان آذر پلاک 11"
                    required=""
                    onChange={e => handleChange('address', e.target.value)}
                />
                <div className="invalid-feedback">
                    لطفا آدرس حمل و نقل خود را وارد کنید.
                </div>
            </div>
            <button onClick={addAddress} type='button' className="btn btn-primary btn-lg btn-block">
                ثبت آدرس
            </button>
        </form>
    )
}

export default AddressForm