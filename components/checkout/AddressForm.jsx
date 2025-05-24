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
        <form className='w-full'>
            <div className="flex flex-col lg:flex-row items-center justify-stretch gap-6 my-4">
                <div className="flex-1/2 flex flex-col w-full">
                    <label htmlFor="fullName" className='text-xs md:text-md py-1'>نام کامل گیرنده</label>
                    <input
                        type="text"
                        onChange={e => handleChange('fullName', e.target.value)}
                        className="py-2 px-6 rounded border border-gray-300 text-xs md:text-md"
                        id="fullName"
                        placeholder=""
                        defaultValue=""
                        required=""
                    />
                </div>
                <div className="flex-1/2 flex flex-col w-full">
                    <label htmlFor="mobile" className='text-xs md:text-md py-1'>شماره موبایل</label>
                    <input
                        type="text"
                        className="py-2 px-6 rounded border border-gray-300 text-xs md:text-md"
                        id="mobile"
                        placeholder=""
                        defaultValue=""
                        required=""
                        onChange={e => handleChange('mobile', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-stretch gap-6 my-4">
                <div className='flex-1 flex flex-col w-full text-xs md:text-md'>
                    <label htmlFor="title">
                        عنوان <span className="text-xs">(اختیاری)</span>
                    </label>
                    <input
                        type="text"
                        className="py-2 px-6 rounded border border-gray-300"
                        id="title"
                        placeholder=""
                        onChange={e => handleChange('title', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-stretch gap-6 my-4">
                <div className="flex-1/3 flex flex-col text-xs md:text-md w-full">
                    <label htmlFor="state" className='text-md py-1'>استان</label>
                    <select
                        className="w-full border border-gray-300 py-2 px-4 rounded outline-0 d-block lg:w-100"
                        onChange={e => handleChange('state', e.target.value)}
                        id="state"
                        required=""
                    >
                        <option value="">انتخاب...</option>
                        <option value='تهران' >تهران</option>
                    </select>
                </div>
                <div className="flex-1/3 flex flex-col text-xs md:text-md w-full">
                    <label htmlFor="city" className='text-md py-1'>شهر</label>
                    <select
                        className="border border-gray-300 py-2 px-4 rounded outline-0 d-block w-full lg:w-100"
                        id="city"
                        required=""
                        onChange={e => handleChange('city', e.target.value)}
                    >
                        <option value="">انتخاب...</option>
                        <option value="پردیس">پردیس</option>
                    </select>
                </div>
                <div className="flex-1/3 flex flex-col text-xs md:text-md w-full">
                    <label htmlFor="zipCode" className='text-md py-1'>کد پستی</label>
                    <input
                        type="text"
                        name='zipCode'
                        className="py-2 px-6 rounded border border-gray-300"
                        id="zipCode"
                        placeholder=""
                        required=""
                        onChange={e => handleChange('zipCode', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col text-xs md:text-md w-full">
                <label htmlFor="address" className='text-md py-1'>آدرس</label>
                <input
                    type="text"
                    name='address'
                    className="py-2 px-2 md:px-6 rounded border border-gray-300"
                    id="address"
                    placeholder="خیابان آذر پلاک 11"
                    required=""
                    onChange={e => handleChange('address', e.target.value)}
                />
            </div>
            <button onClick={addAddress} type='button' className="text-xs md:text-md py-2 px-4 border border-gray-700 text-gray-700 rounded my-4 cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300">
                ثبت آدرس
            </button>
        </form>
    )
}

export default AddressForm